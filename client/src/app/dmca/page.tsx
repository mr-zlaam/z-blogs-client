// DMCA.jsx
import React from "react";

const DMCAPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold">DMCA Policy</h1>
      </header>

      <main className="container mx-auto px-6">
        <section className="bg-background dark:bg-gray-800 shadow-lg rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-foreground dark:text-gray-200">
            Digital Millennium Copyright Act (DMCA) Notice
          </h2>
          <p className="text-lg mb-6 text-foreground dark:text-gray-400 leading-relaxed">
            At Zlaam, we respect the intellectual property rights of others and
            are committed to complying with the Digital Millennium Copyright Act
            (DMCA). If you believe that your copyrighted work has been copied
            and is accessible on our website in a way that constitutes copyright
            infringement, please provide us with a written notice containing the
            following information:
          </p>
          <ul className="list-disc pl-6 mb-6 text-foreground dark:text-gray-400">
            <li>
              <strong>Identification of the copyrighted work:</strong>{" "}
              A description of the copyrighted work that you claim has been
              infringed.
            </li>
            <li>
              <strong>Identification of the infringing material:</strong>{" "}
              A description of where the material you claim is infringing is
              located on our website (e.g., URL).
            </li>
            <li>
              <strong>Your contact information:</strong>{" "}
              Your name, address, telephone number, and email address.
            </li>
            <li>
              <strong>Statement of authority:</strong>{" "}
              A statement that you have a good faith belief that the use of the
              material is not authorized by the copyright owner, its agent, or
              the law.
            </li>
            <li>
              <strong>Statement of accuracy:</strong>{" "}
              A statement that the information in your notice is accurate, and
              under penalty of perjury, that you are authorized to act on behalf
              of the owner of the copyright interest.
            </li>
            <li>
              <strong>Signature:</strong>{" "}
              An electronic or physical signature of the person authorized to
              act on behalf of the owner of the copyright interest.
            </li>
          </ul>
          <p className="text-lg mb-6 text-foreground dark:text-gray-400 leading-relaxed">
            Please send your DMCA notice to:
          </p>
          <address className="mb-6">
            <p className="text-lg text-foreground dark:text-gray-400">
              Email:{" "}
              <a
                href="mailto:dmca@zlaam.com"
                className="text-blue-500 hover:underline"
              >
                zlaam.dev@gmail.com
              </a>
            </p>
          </address>

          <p className="text-lg mb-6 text-foreground dark:text-gray-400 leading-relaxed">
            Upon receiving a valid DMCA notice, we will investigate and take
            appropriate action as required by law. Please note that submitting a
            false DMCA notice may result in legal consequences.
          </p>
        </section>

        <section className="bg-background dark:bg-gray-800 shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-6 text-foreground dark:text-gray-200">
            Counter-Notice
          </h2>
          <p className="text-lg mb-6 text-foreground dark:text-gray-400 leading-relaxed">
            If you believe that your material was removed or disabled by mistake
            or misidentification, you may file a counter-notice with us. A
            counter-notice must include the following information:
          </p>
          <ul className="list-disc pl-6 mb-6 text-foreground dark:text-gray-400">
            <li>
              <strong>Your contact information:</strong>{" "}
              Your name, address, telephone number, and email address.
            </li>
            <li>
              <strong>Identification of the material:</strong>{" "}
              A description of the material that was removed or to which access
              was disabled and the location at which the material appeared
              before it was removed or access was disabled.
            </li>
            <li>
              <strong>Statement of consent:</strong>{" "}
              A statement under penalty of perjury that you have a good faith
              belief that the material was removed or disabled as a result of
              mistake or misidentification.
            </li>
            <li>
              <strong>Signature:</strong>{" "}
              An electronic or physical signature of the person authorized to
              act on behalf of the person who is the subject of the removed
              material.
            </li>
          </ul>
          <p className="text-lg mb-6 text-foreground dark:text-gray-400 leading-relaxed">
            Please send your counter-notice to the same contact information
            provided above.
          </p>
          <p className="text-lg mb-6 text-foreground dark:text-gray-400 leading-relaxed">
            After receiving a valid counter-notice, we may restore the removed
            material within 10-14 business days, unless we receive notice from
            the original complainant that they have filed a court action.
          </p>
        </section>
      </main>
    </div>
  );
};

export default DMCAPage;
