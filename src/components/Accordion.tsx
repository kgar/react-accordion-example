import React, { useState, useContext, createContext, Props, PropsWithChildren } from "react";
import {
  Container,
  Inner,
  Item,
  Body,
  Frame,
  Title,
  Header
} from "./Accordion.styles";

type ToggleContextProps = {
    isShown: boolean;
    setIsShown: React.Dispatch<React.SetStateAction<boolean>>
} | undefined;

const ToggleContext = createContext<ToggleContextProps>(undefined);
export default function Accordion({children, ...restProps}: PropsWithChildren<unknown>) {
    return (
        <Container {...restProps}>
            <Inner>{children}</Inner>
        </Container>
    );
}

Accordion.Title = function AccordionTitle({children, ...restProps}: PropsWithChildren<unknown>) {
    return <Title {...restProps}>{children}</Title>
}

Accordion.Frame = function AccordionFrame({children, ...restProps}: PropsWithChildren<unknown>) {
    return <Frame {...restProps}>{children}</Frame>
}

Accordion.Item = function AccordionItem({children, ...restProps}: PropsWithChildren<unknown>) {
    const [isShown, setIsShown] = useState(true);
    return (
        <ToggleContext.Provider value={{ isShown, setIsShown }}>
            <Item {...restProps}>{children}</Item>
        </ToggleContext.Provider>
    )
}

Accordion.ItemHeader = function AccordionHeader({
    children, ...restProps
}: React.PropsWithChildren<unknown>) {
    const {isShown, setIsShown} = useToggleContext();
    return (
        <Header onClick={() => setIsShown(!isShown)} {...restProps}>
            {children}
        </Header>
    )
}

Accordion.Body = function AccordionBody({children, ...restProps}: React.PropsWithChildren<unknown>) {
    const {isShown} = useToggleContext();
    return (
        <Body className={isShown ? "open": "close"}>
            <span>{children}</span>
        </Body>
    )
}

function useToggleContext() {
    const toggleContext = useContext(ToggleContext);
    if (!toggleContext) throw new Error("ToggleContext.Provider is required in a parent component, as well as a valid value.");
    return toggleContext;
}