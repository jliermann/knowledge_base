import React, { useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

function VideoPrivacy(props) {
    const [acknowledged, setAcknowledged] = useState(false);

    let imgSrc = useBaseUrl(props.imageUrl);

    const containerStyle = {
        position: "relative",
        backgroundColor: "black",
        width: props.width || "800px",
        height: props.height || "600px",
    };

    const backdropStyle = {
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
        filter: "blur(5px)",
        opacity: 0.25,
    };

    const contentStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    };

    if (!acknowledged) {
        return (
            <div style={containerStyle}>
                <div style={backdropStyle} />
                <div style={contentStyle}>
                    <h2 style={{ color: "white" }}>
                        {props.info ||
                            "Please indicate that you understand that this video is loaded from an external source."}
                    </h2>
                    <button
                        className={props.customClass}
                        onClick={() => setAcknowledged(true)}
                    >
                        {props.buttonText || "I understand"}
                    </button>
                </div>
            </div>
        );
    }

    return <React.Fragment>{props.children}</React.Fragment>;
}

export default VideoPrivacy;
