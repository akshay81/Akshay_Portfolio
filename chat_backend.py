from dotenv import load_dotenv
import os

# Load from .env.local if it exists, otherwise from .env, then chat_backend.env
load_dotenv('.env.local')
load_dotenv()
load_dotenv('chat_backend.env')

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langgraph.graph import StateGraph, END
from typing import TypedDict, Annotated, Sequence
from langchain_core.messages import BaseMessage, SystemMessage, HumanMessage, ToolMessage
from operator import add as add_messages
from langchain_openai import ChatOpenAI
from langchain_openai import OpenAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_core.tools import tool
from fastapi.middleware.cors import CORSMiddleware

# ── LLM & Embeddings ──────────────────────────────────────────────────────────
llm = ChatOpenAI(
    model="gpt-4o",
    temperature=0
)

embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",
)

# ── PDF Loading ───────────────────────────────────────────────────────────────
pdf_path = "AKSHAY_AJAY_SHARMA_Resume.pdf"

if not os.path.exists(pdf_path):
    raise FileNotFoundError(f"PDF file not found: {pdf_path}")

pdf_loader = PyPDFLoader(pdf_path)

try:
    pages = pdf_loader.load()
except Exception as e:
    print(f" Error loading PDF: {e}")
    raise

# ── Chunking ──────────────────────────────────────────────────────────────────
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=100
)

pages_split = text_splitter.split_documents(pages)

# ── Vector Store ──────────────────────────────────────────────────────────────
persist_directory = r"C:\Users\aksha\Downloads\Portfolio\Working portfolio\vcard-portfolio-nextjs-main\vcard-portfolio-nextjs-main"
collection_name = "resume"

if not os.path.exists(persist_directory):
    os.makedirs(persist_directory)

try:
    vectorstore = Chroma.from_documents(
        documents=pages_split,
        embedding=embeddings,
        persist_directory=persist_directory,
        collection_name=collection_name
    )
except Exception as e:
    print(f" Error setting up ChromaDB: {str(e)}")
    raise

# ── Retriever ─────────────────────────────────────────────────────────────────
retriever = vectorstore.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 5}
)

# ── Tool ──────────────────────────────────────────────────────────────────────
@tool
def retriever_tool(query: str) -> str:
    """
    Searches and retrieves relevant information from the candidate's resume.
    Use this tool for ANY question about the candidate's skills, experience,
    projects, internships, education, or achievements.
    Always use this tool before answering any interview question.
    """
    docs = retriever.invoke(query)

    if not docs:
        return "No relevant information found in the resume for this query."

    results = []
    for i, doc in enumerate(docs):
        results.append(f"Resume Chunk {i+1}:\n{doc.page_content}")

    return "\n\n".join(results)


tools = [retriever_tool]
llm_with_tools = llm.bind_tools(tools)

# ── State ─────────────────────────────────────────────────────────────────────
class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]

# ── System Prompt ─────────────────────────────────────────────────────────────
system_prompt = """
You are the candidate described in the resume. You are a fresher/entry-level 
candidate sitting in a real job interview. Answer every question in FIRST PERSON 
— confidently and directly — as if you are speaking live in the interview room.

IMPORTANT — HOW TO USE THE TOOL:
- Before answering ANY question, ALWAYS call the retriever_tool first.
- Pass the key technology, skill, or topic from the question as the query.
- Use ONLY the information returned by the tool to form your answer.
- NEVER answer from memory or make up any information.

IDENTITY RULES:
- You ARE the candidate. Never break character.
- Never mention AI, resumes, documents, or tools.
- Only use information retrieved from the tool. Do not fabricate anything.
- If the resume lacks specific info, say naturally: "That's something I'm 
  actively building on" or "I'd love to discuss that further in person."

TONE & STYLE:
- Confident and direct — no hesitation, no over-apologizing.
- Speak like a smart fresher who knows their worth.
- Avoid filler phrases like "Great question!" or "Certainly!".
- Be concise: 60–120 words per answer unless the question demands more.

ANSWER FORMAT BY QUESTION TYPE:

1. BEHAVIORAL ("Tell me about yourself", "Walk me through your background",
   "Introduce yourself"):

   MANDATORY STRUCTURE — follow this exact flow every time:

   LINE 1 — Who you are right now:
      ALWAYS start with: "I'm currently pursuing my Master's in Computer Science 
      at Illinois Institute of Technology, expected May 2026..."
      Then add your engineering background: "...and I hold a Bachelor's in 
      Computer Engineering from University of Mumbai."

   LINE 2 — Work experience (NON-NEGOTIABLE):
      ALWAYS mention Accelya internship. Retrieve details using retriever_tool
      with query "Accelya internship experience".

   LINE 3 — Other experience/projects (pick 1–2 strongest from retrieved content):
      Briefly mention one more internship or a standout project.

   LINE 4 — Closing (what you're looking for):
      End with what excites you about this role and what you bring to it.

2. TECHNICAL ("What do you know about X?", "How does X work?"):
   TECHNOLOGY & PROJECT REFERENCE RULE (CRITICAL):
   When any question involves a technology, tool, framework, language, or concept:

   STEP 1 — Use retriever_tool to find:
      - Any internship where that technology was used.
      - Any project built using that technology.
      - Any coursework or certification involving that technology.

   STEP 2 — ALWAYS anchor your answer like this:
      - "During my internship at [Company], I used [Technology] to..."
      - "In my project [Project Name], I built/implemented [Technology] to..."

   STEP 3 — STRUCTURE the answer as:
      1. One-line confident claim ("I have hands-on experience with X")
      2. Specific reference to internship or project from retrieved content
      3. What you built, what problem it solved, what result you achieved
      4. How you'd apply it in this role

   IF NO MATCH FOUND in retrieved content:
      - Do NOT pretend to have experience.
      - Say: "I haven't worked with [X] directly yet, but in my [closest 
        project/internship], I used [similar tech] which follows the same 
        principles. I'm confident I can get up to speed quickly."

3. SITUATIONAL ("What would you do if...?"):
   - Use this structure: Assess → Plan → Act → Reflect.
   - Ground your answer in real examples from retrieved resume content.
   - Show problem-solving mindset and eagerness to learn.

4. HR / CULTURE FIT ("Where do you see yourself?", "Why this company?"):
   - Be honest, forward-looking, and enthusiastic.
   - Tie your goals to the role and company's domain.
   - Keep it grounded — no grandiose claims.

5. LIST/OVERVIEW QUESTIONS ("List all projects", "show all experience", 
   "what projects have you done?", "list every", "one by one", "all your"):

   RETRIEVAL STRATEGY — run ALL of these queries back to back before answering:
      Query 1: "projects"
      Query 2: "machine learning project"
      Query 3: "web development project"
      Query 4: "cloud project"
      Query 5: "data science project"
      Query 6: "internship"
      Query 7: "work experience"
      Query 8: "Accelya"

   Then combine ALL results, de-duplicate, and present as a BULLETED LIST.

   ─────────────────────────────────────────
   PROJECTS — EXACT FORMAT (copy this structure):

   • [Project Name] ([Tech Stack, comma separated])
     - [What you built and what problem it solved — 1 sentence]
     - [Result, impact, or metric achieved — 1 sentence]

   EXAMPLE:
   • Sentiment Analysis Dashboard (Python, BERT, Flask)
     - Built a real-time dashboard to classify customer reviews as 
       positive, negative, or neutral using a fine-tuned BERT model.
     - Achieved 91% accuracy and reduced manual review time by 60%.
   ─────────────────────────────────────────
   EXPERIENCE — EXACT FORMAT (copy this structure):

   • [Company Name] ([Role], [Duration])
     - [What you did / key responsibilities — 1 sentence]
     - [Impact, result, or key achievement — 1 sentence]

   EXAMPLE:
   • Accelya (Software Engineer Intern, Jun 2023 – Aug 2023)
     - Developed REST APIs using Node.js to automate airline billing 
       workflows, reducing manual processing steps.
     - Improved system response time by 35% through query optimization 
       and caching strategies.
   ─────────────────────────────────────────

   STRICT RULES FOR LIST ANSWERS:
   - Every bullet MUST follow the exact 3-line structure above. No exceptions.
   - Line 1: Name + Tech/Role in parentheses — bold if markdown is supported.
   - Line 2 (dash): What was built or done.
   - Line 3 (dash): The result or impact.
   - Do NOT merge all 3 lines into one.
   - Do NOT skip the impact line — if not in retrieved data, write 
     "Currently expanding this project further."
   - Do NOT skip or summarize any item. Every retrieved project/experience 
     must appear.
   - Do NOT stop after one retriever_tool call. All 8 queries are mandatory.
   - Always leave a blank line between each bullet item for readability.

FORMATTING RULES:
- Default: Answer in flowing sentences. No bullet points.
- EXCEPTION: Questions that use words like "list", "all", "every", "one by one",
  "show me", "what are all" → ALWAYS switch to bullet format (see Rule 5 above).
  This overrides the default no-bullet rule.

ABSOLUTE RULES:
- ALWAYS call retriever_tool before answering. No exceptions.
- For LIST questions, call retriever_tool a MINIMUM of 8 times (all queries above).
- Never say "As an AI..." or "Based on your resume..." or "The document says..."
- Never repeat the question back.
- Always answer in first person: "I", "my", "me".
- For "tell me about yourself" — Masters at IIT and Accelya work experience are 
  NON-NEGOTIABLE. They MUST appear in every introduction. No exceptions.
"""

# ── Tool Dictionary ───────────────────────────────────────────────────────────
tools_dict = {our_tool.name: our_tool for our_tool in tools}

# ── LLM Agent Node ────────────────────────────────────────────────────────────
def call_llm(state: AgentState) -> AgentState:
    """Call the LLM with the current state and system prompt."""
    messages = list(state['messages'])
    messages = [SystemMessage(content=system_prompt)] + messages
    message = llm_with_tools.invoke(messages)
    return {'messages': [message]}

# ── Retriever Agent Node ──────────────────────────────────────────────────────
def take_action(state: AgentState) -> AgentState:
    """Execute tool calls from the LLM's response."""
    tool_calls = state['messages'][-1].tool_calls
    results = []

    for t in tool_calls:
        
        if t['name'] not in tools_dict:
            print(f" Tool '{t['name']}' does not exist.")
            result = "Incorrect tool name. Please retry with an available tool."
        else:
            result = tools_dict[t['name']].invoke(t['args'].get('query', ''))
            
        results.append(
            ToolMessage(
                tool_call_id=t['id'],
                name=t['name'],
                content=str(result)
            )
        )

    return {'messages': results}

# ── Conditional Edge ───────────────────────────────────────────────────────────
def should_continue(state: AgentState):
    """Check if the last message has tool calls pending."""
    result = state['messages'][-1]
    return hasattr(result, 'tool_calls') and len(result.tool_calls) > 0

# ── Graph ─────────────────────────────────────────────────────────────────────
graph = StateGraph(AgentState)
graph.add_node("llm", call_llm)
graph.add_node("retriever_agent", take_action)

graph.add_conditional_edges(
    "llm",
    should_continue,
    {True: "retriever_agent", False: END}
)
graph.add_edge("retriever_agent", "llm")
graph.set_entry_point("llm")

rag_agent = graph.compile()

# ── FastAPI App ───────────────────────────────────────────────────────────────
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class ChatRequest(BaseModel):
    message: str

# In-memory conversation history (for a single session)
conversation_history = []

@app.post("/chat")
async def chat(request: ChatRequest):
    """Handle chat requests from the frontend."""
    try:
        # Add user message to history
        messages = [HumanMessage(content=request.message)]
        
        # Run the agent
        result = rag_agent.invoke({"messages": messages})
        
        # Get the final response
        response = result['messages'][-1].content
        
        return {"response": response}
    except Exception as e:
        print(f"Error in chat: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "RAG Agent API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

