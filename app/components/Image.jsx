import Image from 'next/image';

const MyImage = ({ alt = '', ...props }) => {
  return (
    <Image
      unoptimized={true}
      alt={alt}
      {...props}
    />
  );
};

export default MyImage;