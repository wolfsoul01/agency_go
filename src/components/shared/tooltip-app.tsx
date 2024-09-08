import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface Props {
  text: string | React.ReactNode;
  children: React.ReactNode;
}

function TooltipApp(props: Props) {
  const { text, children } = props;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default TooltipApp;
