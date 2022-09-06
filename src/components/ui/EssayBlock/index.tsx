import React from 'react'
import WorkSended from '@components/ui/WorkSended'
import WorkBtn from '@components/ui/WorkBtn'
import EssayBlockArea from './area'
import EssayBlockText from './text'

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