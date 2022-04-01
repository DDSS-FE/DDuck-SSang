import { useState } from 'react';

import { CommentForm } from 'components/CommentForm';

import { IArticleSummary } from 'utils/types';

const useCommentForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  function renderCommentForm(article: IArticleSummary) {
    return (
      <CommentForm isOpen={isOpen} setIsOpen={setIsOpen} article={article} />
    );
  }

  return { handleOpen, renderCommentForm };
};

export default useCommentForm;
