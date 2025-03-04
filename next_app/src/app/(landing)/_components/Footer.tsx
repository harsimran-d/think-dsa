"use client";

const Footer = () => {
  return (
    <footer id="footer" className="bg-neutral-900 pt-16 pb-8 text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Company Info */}
          <div className="col-span-1">
            <h3 className="mb-4 text-xl font-bold text-white">ThinkDSA</h3>
            <p className="mb-4">
              An AI-powered, non-coding platform that helps you develop critical
              thinking skills for DSA. Personalized questions. Real-time
              feedback. Smarter learning.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="transition-colors duration-300 hover:text-white"
              >
                {/* <X /> */}
              </a>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-white"
              >
                {/* <Google /> */}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 flex flex-col items-center">
            <h4 className="mr-[10px] mb-4 font-semibold text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Home", "Features", "How It Works", "FAQ"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                    className="transition-colors duration-300 hover:text-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} ThinkDSA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
