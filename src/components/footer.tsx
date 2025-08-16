import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between gap-8 bg-white p-4 px-6">
      <small>
        Made by{" "}
        <a
          href="https://github.com/henzyd"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Henzyd
        </a>
      </small>
      <div className="flex items-center gap-4">
        <IoMail className="text-base" />
        <FaGithub />
        <FaLinkedin />
      </div>
    </footer>
  );
}
