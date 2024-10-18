export const SITE_VERSION = 1;
// pagination stuff
export const DELAY = 500;
export const LIMIT = 10;
export const PAGE = 2;
export const REVALIDATE = 600; //28800 = 8hours
export const SITE_URL = "https://zlaam.vercel.app";
export const IS_NOT_DEV_ENV = false; // check if it is in development environment
// ******************* expiration date of token
export const expirationDate = new Date();
expirationDate.setTime(expirationDate.getTime() + 7 * 24 * 60 * 60 * 1000);
// ***********************************************
export const SITE_DESCRIPTION = `Discover a Curated Collection of Insightful Business Articles for Developers and Tech Enthusiasts!

Welcome to our comprehensive platform, where we proudly present a carefully curated selection of insightful business articles tailored specifically for developers and technology enthusiasts. This application is crafted by mr-zlaam, a dedicated web developer with several years of experience specializing in the MERN Stack (MongoDB, Express.js, React.js, and Node.js).

Driven by a deep passion for web development, mr-zlaam utilizes his extensive knowledge to create content that not only informs but also inspires fellow developers and tech lovers. His commitment to sharing valuable insights is reflected in our articles, which cover a wide range of topics, including the latest trends in technology, best practices for web development, innovative business strategies, and practical tips for enhancing your coding skills.

Whether you are a seasoned developer looking to stay updated on industry advancements or a tech enthusiast eager to expand your knowledge, our collection, crafted by mr-zlaam, offers invaluable insights that can help you excel in your career. Dive into the articles today and join a community of like-minded individuals who share your passion for technology and development!

With mr-zlaam at the helm, you can expect high-quality, engaging content that caters to your interests and needs. Don’t miss out on the opportunity to learn from an expert in the field. Explore our articles now and take the next step in your development journey!
`
