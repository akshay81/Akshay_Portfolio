// Desc: Blog page 
import "@/app/globals.css";
import MyImage from "../components/Image";


import blog1 from "@/public/blog-1.jpg";
import blog2 from "@/public/blog-2.jpg";
import blog3 from "@/public/blog-3.jpg";
import blog4 from "@/public/blog-4.jpg";
import blog5 from "@/public/blog-5.jpg";
import blog6 from "@/public/blog-6.jpg";


const blogs = [
    {
        src: blog1,
        alt: "Did Apple need Steve?",
        category: "Blog",
        dateTime: "2024-01-25",
        dateText: "Jan 25, 2024",
        title: "Did Apple need Steve?",
        text: "Oftentimes you might start something and then you might not be not the one to finish it.",
        link: "https://siyamafroz.substack.com/p/did-apple-need-steve"
    },

    {
        src: blog2,
        alt: "Why sharing ideas is important?",
        category: "Blog",
        dateTime: "2023-07-02",
        dateText: "Jul 2, 2023",
        title: "Why sharing ideas is important?",
        text: "Combining different ways of thinking and sharing our ideas, we can learn a lot and make exciting discoveries.",
        link: "https://siyamafroz.substack.com/p/issue-8-why-sharing-ideas-is-important"
    },

    {
        src: blog3,
        alt: "Don't pick a niche",
        category: "Blog",
        dateTime: "2023-02-14",
        dateText: "Feb 14, 2023",
        title: "Don't pick a niche",
        text: "Jack of all trades is a master of none”. But oftentimes better than a master of one.",
        link: "https://siyamafroz.substack.com/p/issue-4-dont-pick-a-niche",
    },

    {
        src: blog4,
        alt: "Write down your life",
        category: "Blog",
        dateTime: "2023-02-24",
        dateText: "Feb 24, 2023",
        title: "Write down your life",
        text: "Write things down so you can remember them if you need to.",
        link: "https://siyamafroz.substack.com/p/issue-5-write-down-your-life",
    },

    {
        src: blog5,
        alt: "Programming guide 2024",
        category: "Programming",
        dateTime: "2023-12-28",
        dateText: "Dec 28, 2023",
        title: "Programming guide 2024",
        text: "The on face programming guide for 2024 and upcoming years",
        link: "https://medium.com/@sorenblank/programming-guide-2024-7b04ff680141"
    },

    {
        src: blog6,
        alt: "NoFap can make you a better engineer",
        category: "Self Improvement",
        dateTime: "2023-07-18",
        dateText: "Jul 18, 2023",
        title: "NoFap can make you a better engineer",
        text: "Anything good in life doesn’t come quick or easy ~",
        link: "https://siyamafroz.substack.com/p/issue-10-nofap-can-make-you-a-better"
    }

]


export default function Blog(){
    return (
        <article class="blog active" data-page="blog">

        <header>
          <h2 class="h2 article-title">Blog</h2>
        </header>

        <section class="blog-posts">

          <ul class="blog-posts-list">

          {blogs.map((blog, index) => (
                        <li class="blog-post-item" key={index}>
                            <a href={blog.link || "#"}>

                                <figure class="blog-banner-box">
                                    <MyImage src={blog.src} alt={blog.alt} loading="lazy" />
                                </figure>

                                <div class="blog-content">

                                    <div class="blog-meta">
                                        <p class="blog-category">{blog.category}</p>

                                        <span class="dot"></span>

                                        <time dateTime={blog.dateTime}>{blog.dateText}</time>
                                    </div>

                                    <h3 class="h3 blog-item-title">{blog.title}</h3>

                                    <p class="blog-text">
                                        {blog.text}
                                    </p>

                                </div>

                            </a>
                        </li>
                    ))}

          </ul>

        </section>

      </article>
    );
}