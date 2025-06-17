import { useId } from "react";


export type JobBoards = "linkedin" | "indeed" | "monster" | "glassdoor";

export function JobBoardLogoDisplay({
    jobBoardType,
    size = 70,
}: {
    jobBoardType: JobBoards;
    size?: number;
}) {

    const getSvg = () => {
        const commonProps = {
            xmlns: "http://www.w3.org/2000/svg",
            width: size,
            height: size,
            fill: "white",
        };

        const maskId = useId(); // <- Unique per render


        switch (jobBoardType) {
            case "indeed":
                return (
                    <svg {...commonProps} viewBox="48 16 152 224"><g><g transform="scale(8,8)"><path d="M18.5,2c-7.75,0 -12.5,9.25 -12.5,14c0,0 3.25,-12 13,-12c3.625,0 6,2 6,2c0,0 -1,-4 -6.5,-4zM17.5,7c-1.933,0 -3.5,1.567 -3.5,3.5c0,1.933 1.567,3.5 3.5,3.5c1.933,0 3.5,-1.567 3.5,-3.5c0,-1.933 -1.567,-3.5 -3.5,-3.5zM20,16c0,0 -1,1 -5,1v10.5c0,1.381 1.119,2.5 2.5,2.5c1.381,0 2.5,-1.119 2.5,-2.5z"></path></g></g></svg>
                );
            case "linkedin":
                return (
                    <svg {...commonProps} viewBox="4 4 42 42"><path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path></svg>
                );
            case "monster":
                return (
                    <svg {...commonProps} viewBox="21.7 21.7 116.6 116.6"><defs><mask id="cutoutMask"><rect width="160" height="160" fill="white"></rect><path d="M104.3,55.7l-24.3,22.7L55.7,55.7v48.6h11v-23.5l13.3,11.8l13.3-11.8v23.5h11V55.7z" fill="black"></path></mask></defs><circle cx="80" cy="80" r="58.3" fill="white" mask="url(#cutoutMask)"></circle></svg>
                );
            case "glassdoor":
                return (
                    <svg {...commonProps} viewBox="0 0 1024 1024">
                        <defs>
                            <mask id={maskId}>
                                <rect width="100%" height="100%" fill="white" />
                                <path
                                    d="M621.7 694.9H329.1c0 40.4 32.7 73.1 73.1 73.1h219.4c40.4 0 73.1-32.7 73.1-73.1V394.5c0-1.5-1.2-2.7-2.7-2.7h-67.8c-1.5 0-2.7 1.2-2.7 2.7v300.4h.2zm0-438.9c40.4 0 73.1 32.7 73.1 73.1H402.3v300.4c0 1.5-1.2 2.7-2.7 2.7h-67.8c-1.5 0-2.7-1.2-2.7-2.7V329.1c0-40.4 32.7-73.1 73.1-73.1h219.5z"
                                    fill="black"
                                />
                            </mask>
                        </defs>
                        <circle cx="512" cy="512" r="512" mask={`url(#${maskId})`} />
                    </svg>
                );
            default:
                return null;
        }
    }

    function getHref() {
        switch (jobBoardType) {
            case "indeed":
                return "https://www.indeed.com";
            case "linkedin":
                return "https://www.linkedin.com/jobs";
            case "monster":
                return "https://www.monster.com";
            case "glassdoor":
                return "https://www.glassdoor.com";
            default:
                return "#";
        }
    }

    return (<>
        <a href={getHref()}>{getSvg()}</a>
    </>)


}
