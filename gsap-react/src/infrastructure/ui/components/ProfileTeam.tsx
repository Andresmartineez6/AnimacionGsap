import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { getTeamProfiles } from "../../../application/uses-cases/getTeamProfiles";
import "../../../styles/profileTeam.css";


gsap.registerPlugin(SplitText);

export const ProfileTeam: React.FC = () => {
  const profiles = getTeamProfiles();
  const nameRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const defaultRef = useRef<HTMLHeadingElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Separar letras de cada H1 con SplitText
    nameRefs.current.forEach((el) => {
      if (el) {
        const split = new SplitText(el, { type: "chars" });
        split.chars.forEach((char) => char.classList.add("letter"));
      }
    });

    const defaultLetters = defaultRef.current?.querySelectorAll(".letter");
    if (defaultLetters) {
      gsap.set(defaultLetters, { y: "100%" });
    }

    if (window.innerWidth > 900) {
      imgRefs.current.forEach((img, i) => {
        const heading = nameRefs.current[i + 1];
        const letters = heading?.querySelectorAll(".letter") ?? [];

        if (!img) return;

        img.addEventListener("mouseenter", () => {
          gsap.to(img, {
            width: 140,
            height: 140,
            duration: 0.5,
            ease: "power4.out",
          });

          gsap.to(letters, {
            y: "-100%",
            ease: "power4.out",
            duration: 0.75,
            stagger: {
              each: 0.025,
              from: "center",
            },
          });

          if (defaultLetters) {
            gsap.to(defaultLetters, {
              y: "100%",
              ease: "power4.out",
              duration: 0.75,
              stagger: {
                each: 0.025,
                from: "center",
              },
            });
          }
        });

        img.addEventListener("mouseleave", () => {
          gsap.to(img, {
            width: 70,
            height: 70,
            duration: 0.5,
            ease: "power4.out",
          });

          gsap.to(letters, {
            y: "0%",
            ease: "power4.out",
            duration: 0.75,
            stagger: {
              each: 0.025,
              from: "center",
            },
          });

          if (defaultLetters) {
            gsap.to(defaultLetters, {
              y: "0%",
              ease: "power4.out",
              duration: 0.75,
              stagger: {
                each: 0.025,
                from: "center",
              },
            });
          }
        });
      });
    }
  }, []);

  return (
    <section className="team">
      <div className="profile-images" ref={containerRef}>
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="img"
            ref={(el) => {
              imgRefs.current[index] = el;
            }}
          >
            <img src={profile.image} alt={profile.alt} />
          </div>
        ))}
      </div>

      <div className="profile-names">
        <div className="name default">
          <h1 ref={defaultRef}>Equipo</h1>
        </div>
        {profiles.map((profile, index) => (
          <div className="name" key={index}>
            <h1
              ref={(el) => {
                nameRefs.current[index + 1] = el;
              }}
            >
              {profile.name}
            </h1>
          </div>
        ))}
      </div>
    </section>
  );
};
