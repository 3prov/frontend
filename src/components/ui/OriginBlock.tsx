import React from 'react'
import { TaskKey } from '../../entities/essay'
import { descriptionMaker, stringToText } from '../../utils'

type OriginBlockProps = {
  task?: {
    body: string,
    author: string,
    author_description: string
  },
  task_keys?: TaskKey[]
}

const OriginBlock: React.FC<OriginBlockProps> = ({
  task: {
    body,
    author,
    author_description
  } = {body: '', author: '', author_description: ''},
  task_keys
}) => {
  return (
    <div className='Origin'>
      { stringToText(body, (t, idx) => <p key={idx} className='p__pretty'>{t}</p>) }
      <p className='Origin-author'>({author}*)</p>
      { descriptionMaker(author_description, (t) => 
          <p className='Origin-author-desc'>
            <span className='Origin-author__bold'>{t[0]}</span>{t[1]}
          </p>
      )}
    </div>
  )
}

export default React.memo(OriginBlock)