import debounce from "lodash.debounce"
import React, { useEffect, useRef, useState } from "react"
import { resize } from "./utils"

const EssayBlockArea: React.FC<EssayBlockAreaProps> = ({change, value, className}) => {
  const [text, setText] = useState(value || '')
  const ref = useRef<HTMLTextAreaElement | null>(null)
  const debounced = change && debounce((e) => change(e), 1000)

  useEffect(() => {
    resize(ref)
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    resize(ref)
    debounced && debounced(e)
  }

  return (
    <textarea value={text} onChange={onChange} className={className} ref={ref}/>
  )
}

export default EssayBlockArea