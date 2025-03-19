import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Box, Flex, Text } from "@radix-ui/themes";

function Footer(){
    return (
        <Box style={{ background: "var(--gray-a2)", borderRadius: "var(--radius-3)", justifyItems: "center", padding: "50px 0", marginTop: "30px" }}>
            <Flex>
                <GitHubLogoIcon width="20" height="20" display="inline" style={{marginRight: "10px"}}/>
                <Text>Buyandelger Tsendsuren</Text>
            </Flex>
        </Box>
    )
}

export default Footer;