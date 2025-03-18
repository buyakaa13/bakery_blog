import {Box, Section} from '@radix-ui/themes';

function Bookmark(){
    return(
        <Box py="8" style={{ backgroundColor: "var(--gray-a2)", borderRadius: "var(--radius-3)" }}>
            {/* <DecorativeBox asChild> */}
                <Section size="2">
                    Hello
                    </Section>
            {/* </DecorativeBox> */}
        </Box>
    )
}

export default Bookmark;