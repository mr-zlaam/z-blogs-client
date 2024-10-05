import zlaam from "../../../public/logo/Zlaam.jpg";
import josh from "../../../public/logo/josh.jpeg";
import Image from "next/image";
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className=" text-foreground py-8 shadow-md">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold">About US</h1>
        </div>
      </header>

      <main className="py-12">
        <div className="container mx-auto px-6">
          <section className="bg-background dark:bg-gray-800 shadow-lg rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-foreground dark:text-gray-200">
              Welcome to the world of articles!
            </h2>
            <p className="text-lg mb-6 text-foreground dark:text-gray-400 leading-relaxed">
              At here, we are passionate about technology and programming. Our
              goal is to provide insightful content that helps you stay updated
              with the latest trends in tech, enhance your coding skills, and
              solve problems you encounter along your tech journey.
            </p>
            <p className="text-lg mb-6 text-foreground dark:text-gray-400 leading-relaxed">
              Whether you&apos;re a seasoned developer or just starting out, we
              cover a wide range of topics including programming languages,
              software development practices, emerging technologies, and more.
              Our team of experts and enthusiasts is dedicated to bringing you
              the best resources and tips to fuel your curiosity and drive your
              success.
            </p>
            <p className="text-lg text-foreground dark:text-gray-400 leading-relaxed">
              Thank you for visiting Zlaam. We hope you find our content
              valuable and engaging. If you have any questions, suggestions, or
              just want to say hi, feel free to{" "}
              <a
                href="mailto:zlaam.dev@gmail.com"
                className="text-blue-500 hover:underline"
              >
                reach out to us
              </a>
              !
            </p>
          </section>

          <section className="bg-background dark:bg-gray-800 shadow-lg rounded-lg p-8">
            <h2 className="text-3xl font-semibold mb-6 text-foreground dark:text-gray-200">
              Meet the Team
            </h2>
            <div className="flex flex-wrap -mx-4 justify-around">
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className=" dark:bg-gray-700 shadow-md shadow-foreground/20 dark:shadow-none p-6 rounded-lg text-center">
                  <Image
                    src={zlaam}
                    alt="zlaam"
                    className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
                    placeholder="blur"
                    width={100}
                    height={100}
                  />
                  <h3 className="text-xl font-medium mb-2 text-foreground dark:text-gray-100">
                    Zlaam
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Lead Developer & Writer
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 mb-8">
                <div className=" dark:bg-gray-700 shadow-md shadow-foreground/20 dark:shadow-none p-6 rounded-lg text-center">
                  <Image
                    src={josh}
                    alt="josh"
                    className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
                    width={100}
                    height={100}
                  />
                  <h3 className="text-xl font-medium mb-2 text-foreground dark:text-gray-100">
                    Josh
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Technical Writer & Editor
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
