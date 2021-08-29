import React, {
  useState,
  useContext,
  createContext,
  PropsWithChildren,
} from "react";
import {
  Container,
  Inner,
  Item,
  Body,
  Frame,
  Title,
  Header,
} from "./Accordion.styles";

export default function Accordion({
  children,
  ...restProps
}: PropsWithChildren<unknown>) {
  return (
    <Container {...restProps}>
      <Inner>{children}</Inner>
    </Container>
  );
}

Accordion.Title = function AccordionTitle({
  children,
  ...restProps
}: PropsWithChildren<unknown>) {
  return <Title {...restProps}>{children}</Title>;
};

type AccordionFrameContextProps = {
  selectedIndex: number | undefined;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const AccordionFrameContext = React.createContext<
  AccordionFrameContextProps | undefined
>(undefined);

Accordion.Frame = function AccordionFrame({
  children,
  ...restProps
}: PropsWithChildren<unknown>) {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );
  return (
    <AccordionFrameContext.Provider value={{ selectedIndex, setSelectedIndex }}>
      <Frame {...restProps}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { index });
          }
          return child;
        })}
      </Frame>
    </AccordionFrameContext.Provider>
  );
};

type AccordionContextProps =
  | {
      index: number;
    }
  | undefined;

const AccordionItemContext = createContext<AccordionContextProps>(undefined);

Accordion.Item = function AccordionItem({
  children,
  index,
  ...restProps
}: PropsWithChildren<unknown & { index?: number }>) {
  return index !== undefined ? (
    <AccordionItemContext.Provider value={{ index }}>
      <Item {...restProps}>{children}</Item>
    </AccordionItemContext.Provider>
  ) : null;
};

Accordion.ItemHeader = function AccordionHeader({
  children,
  ...restProps
}: React.PropsWithChildren<unknown>) {
  const { index } = useAccordionItemContext();
  const { selectedIndex, setSelectedIndex } = useAccordionFrameContext();

  const onHeaderClicked = () => {
    const newIndex = index === selectedIndex ? undefined : index;

    setSelectedIndex(newIndex);
  };

  return (
    <Header onClick={onHeaderClicked} {...restProps}>
      {children}
    </Header>
  );
};

Accordion.Body = function AccordionBody({
  children,
  ...restProps
}: React.PropsWithChildren<unknown>) {
  const { selectedIndex } = useAccordionFrameContext();
  const { index } = useAccordionItemContext();
  const isSelected = selectedIndex === index;
  return (
    <Body className={isSelected ? "open" : "closed"}>
      <span>{children}</span>
    </Body>
  );
};

function useAccordionItemContext() {
  const accordionItemContext = useContext(AccordionItemContext);
  if (!accordionItemContext)
    throw new Error(
      "AccordionItemContext.Provider is required in a parent component, as well as a valid value."
    );
  return accordionItemContext;
}

function useAccordionFrameContext() {
  const accordionframeContext = useContext(AccordionFrameContext);
  if (!accordionframeContext)
    throw new Error(
      "AccordionFrameContext.Provider is required in a parent component, as well as a valid value."
    );
  return accordionframeContext;
}
