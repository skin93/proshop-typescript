import React, { FC } from 'react'
import { Alert } from 'react-bootstrap'

interface IMessageProps {
  variant?: string
}

const BaseMessage: FC<IMessageProps> = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>
}

BaseMessage.defaultProps = {
  variant: 'info'
}

export default BaseMessage
