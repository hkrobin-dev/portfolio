"use client";

import { Github, Linkedin, Twitter } from "lucide-react";


const socials = [
  {
    label: "GitHub",
    url: "https://github.com/yourname",
    icon: Github,
  },

  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/yourname",
    icon: Linkedin,
  },

  {
    label: "Twitter",
    url: "https://x.com/yourname",
    icon: Twitter,
  },
];



export default function Footer() {

  return (

    <footer
      className="
      border-t
      border-white/10
      px-6
      py-10
      bg-gradient-to-b
      from-background
      to-slate-900/40
      "
    >

      <div
        className="
        mx-auto
        max-w-content
        flex
        flex-col
        items-center
        justify-between
        gap-6
        sm:flex-row
        "
      >


        {/* Copyright */}

        <p
          className="
          text-sm
          text-gray-400
          "
        >
          © {new Date().getFullYear()} 
          <span className="ml-1 text-white font-semibold">
            Kabir
          </span>
          . All rights reserved.
        </p>





        {/* Social Links */}

        <div className="flex gap-3">


          {
            socials.map((social)=>{

              const Icon = social.icon;


              return (

                <a

                key={social.label}

                href={social.url}

                target="_blank"

                rel="noopener noreferrer"

                className="
                group
                flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/5
                px-4
                py-2
                text-sm
                text-gray-400
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-400/50
                hover:text-cyan-400
                hover:shadow-lg
                hover:shadow-cyan-400/20
                "

                >

                  <Icon
                    size={18}
                    className="
                    transition
                    group-hover:scale-110
                    "
                  />

                  <span>
                    {social.label}
                  </span>


                </a>

              );

            })
          }


        </div>



      </div>


    </footer>

  );

}