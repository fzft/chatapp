import React, { useContext } from 'react';

import { Filter, Friend } from '@/Components';

export const ChatApp = () => {
  return (
    <div>
      <Filter/>
      <Friend/>
    </div>
  )
}

export default ChatApp
