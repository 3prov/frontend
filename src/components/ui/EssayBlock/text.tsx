import { stringToText } from "@src/utils"

const EssayBlockText: React.FC<EssayBlockTextProps> = ({text, select, className}) => {
  return (
    <>
      { stringToText(text, (t, idx) => <p className={className} key={idx}>{t}</p>) }
    </>
  )
}

export default EssayBlockText