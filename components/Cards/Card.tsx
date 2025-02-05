import { FC, useState, useRef, useEffect } from 'react'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import { CopyToClipboard } from 'components/CopyToClipboard'
import type { IData } from 'types'

interface CardProps {
  data: IData
}

const Card: FC<CardProps> = ({ data }) => {
  const { name, description, url } = data
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const [isOverflow, setIsOverflow] = useState(false)

  useEffect(() => {
    if (descriptionRef.current) {
      setIsOverflow(
        descriptionRef.current.scrollHeight >
          descriptionRef.current.offsetHeight
      )
    }
  }, [])

  return (
    <article className="z-10 h-full w-full rounded-3xl border border-dashed border-theme-secondary dark:border-theme-primary bg-[rgba(255,255,255,0.3)] shadow-md dark:bg-dark dark:text-text-primary dark:shadow-sm">
      <div className="card-body">
        <header className="flex justify-between items-center">
          <h2
            className="cursor-default md:truncate ... text-xl text-theme-secondary dark:text-theme-primary"
            title={name}
          >
            {name}
          </h2>
          <CopyToClipboard url={url} />
        </header>
        <div className="h-[7rem]">
          <div
            ref={descriptionRef}
            className="h-24 w-full overflow-hidden font-sans text-ellipsis line-clamp-4"
          >
            {description}
          </div>
          {isOverflow && (
            <p className="text-sm underline text-theme-secondary dark:text-theme-primary text-right hover:text-theme-primary dark:hover:text-text-primary">
              Read More
            </p>
          )}
        </div>
        <footer className="card-actions justify-end">
          <a
            onClick={(e) => e.stopPropagation()}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={
              'mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-transparent bg-theme-secondary px-6 py-2 text-center text-light-primary duration-100 hover:border-theme-primary hover:bg-transparent hover:text-theme-secondary dark:hover:text-theme-primary'
            }
          >
            Visit site
            <BsBoxArrowUpRight />
          </a>
        </footer>
      </div>
    </article>
  )
}

export default Card
