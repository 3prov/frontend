import { debounce } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { Essay } from '@entities/essay'
import { stringToText } from '@src/utils'
import WorkBtn from './WorkBtn'
import WorkSended from './WorkSended'

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

const resize = (ref: React.MutableRefObject<HTMLTextAreaElement | null>) => {
  const scrollLeft = window.pageXOffset || (document.documentElement || document.body.parentNode || document.body).scrollLeft;
  const scrollTop  = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;

  ref.current!.style.height = "auto";
  ref.current!.style.height = ref.current!.scrollHeight + 'px';

  window.scrollTo(scrollLeft, scrollTop);
}

const EssayBlockArea = ({change, value, className}: EssayBlockAreaProps) => {
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

const EssayBlockText: React.FC<EssayBlockTextProps> = ({text, select, className}) => {
  return (
    <>
      { stringToText(text, (t, idx) => <p className={className} key={idx}>{t}</p>) }
    </>
  )
}

const EssayBlock: React.FC<EssayBlockProps> = ({
  essay,
  changeText,
  selectText,
  click,
  isEdit
}) => {
  
  return (
    <div className='Essay'>
      { essay?.created_at && !isEdit && <WorkSended at={essay.created_at} /> }
      {
        isEdit 
        ? <EssayBlockArea value={essay?.body} change={changeText} className={`Essay-input${isEdit ? ' Essay-input__edit' : ''}`}/>
        : <EssayBlockText select={selectText} text={essay?.body || ''} className="p__pretty"/>
      }
      { (click) &&
        <WorkBtn click={click} currentStatus={isEdit ? 'send' : 'edit'} />
      }
    </div>
  )
}

export default EssayBlock