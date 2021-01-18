import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

interface IProps {
  title?: string
  description?: string
  keywords?: string
}

const Meta: FC<IProps> = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome To Proshop',
  description: 'We sell the best products for cheap',
  keywords: 'electronics, buy electronic, cheap electronic'
}

export default Meta
