import { AspectRatio } from "@radix-ui/themes";

function AspectRatioComp(){
    return(
        <AspectRatio ratio={20 / 6}>
            <img
                src="../../public/banner.png"
                alt="banner image"
                style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    borderRadius: "var(--radius-2)",
                }}
            />
        </AspectRatio>
    )
}

export default AspectRatioComp;