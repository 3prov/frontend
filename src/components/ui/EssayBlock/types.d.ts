type EssayBlockProps = {
  essay: Essay | null,
  changeText?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
  selectText?: (e: React.SyntheticEvent<HTMLDivElement>) => void,
  click?: (e: React.SyntheticEvent<HTMLButtonElement>) => void,
  isEdit?: boolean
}

type EssayBlockAreaProps = {
  change?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, 
  value?: string, 
  className?: string
}

type EssayBlockTextProps = {
  text: string,
  select?: (e: React.SyntheticEvent<HTMLParagraphElement>) => void,
  className?: string
}

type resizeFn = (ref: React.MutableRefObject<HTMLTextAreaElement | null>) => void
