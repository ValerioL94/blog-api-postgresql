import { Form, useActionData, useNavigate, useSubmit } from 'react-router-dom';
import { useAuth } from '../provider/context';
import { useEffect, useState } from 'react';
import {
  TinyMCEEVent,
  TPostDetail,
  TPostUpdate,
  TValidationErrors,
} from '../types/types';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import ErrorList from './ErrorList';
import { toast } from 'react-toastify';
import CustomButton from './CustomButton';

const PostFormUpdate = ({
  setEdit,
  postData,
}: {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  postData: TPostDetail;
}) => {
  const { authData } = useAuth();
  const initialFormState: TPostUpdate = {
    title: postData.title,
    content: postData.content,
    published: postData.published.toString(),
  };
  const navigate = useNavigate();
  const response = useActionData();
  const submit = useSubmit();
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState<TValidationErrors | null>(null);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | TinyMCEEVent
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const parseEditorData = (content: string, editor: TinyMCEEditor) => {
    const { targetElm } = editor;
    const { id } = targetElm;
    return {
      target: {
        name: id,
        value: content,
      },
    };
  };
  const handleFormCancel = () => {
    // without a page reload the form keeps
    // showing eventual errors from previous submits
    if (formErrors) {
      setEdit(false);
      navigate(0);
    } else setEdit(false);
  };
  useEffect(() => {
    if (response) {
      const { errors } = response as { errors: TValidationErrors };
      if (errors) {
        return setFormErrors(errors);
      } else {
        toast.success('Post updated!', { autoClose: 2000 });
        navigate('/posts', { replace: true });
      }
    }
  }, [response, navigate]);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          submit({ ...formData, token: authData!.token }, { method: 'PUT' });
        }}
        className='sm:p-1'
        method='PUT'
      >
        <label htmlFor='title'>Title: </label>
        <input
          type='text'
          name='title'
          id='title'
          className='block w-full py-1 px-2 mb-3 border-2 border-solid border-gray-500 rounded-md text-sm hover:border-green-600 focus:border-green-700 outline-none'
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <label htmlFor='content'>Content: </label>
        <Editor
          apiKey='e0p67za2rxewpb4t1ff4jwma3opsrmuv2u1cihj7te5jpvx8'
          textareaName='content'
          id='content'
          value={formData.content}
          onEditorChange={(content, editor) =>
            handleInputChange(parseEditorData(content, editor))
          }
          init={{
            menubar: false,
            plugins: [
              // Core editing features
              'anchor',
              'autolink',
              'charmap',
              'codesample',
              'emoticons',
              'image',
              'link',
              'lists',
              'media',
              'searchreplace',
              'table',
              'visualblocks',
              'wordcount',
            ],
            toolbar:
              'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | removeformat',
          }}
        />
        <label htmlFor='published'>Published: </label>
        <select
          name='published'
          id='published'
          className='block w-full py-1 px-2 mb-3 border-2 border-solid border-gray-500 rounded-md text-sm hover:border-green-600 focus:border-green-700 outline-none'
          value={formData.published}
          onChange={handleInputChange}
          required
        >
          <option value='false'>No</option>
          <option value='true'>Yes</option>
        </select>
        <div className='flex my-2 items-center justify-between'>
          <CustomButton type='submit' content='Submit' />
          <CustomButton content='Cancel' onClick={handleFormCancel} />
        </div>
      </Form>
      {formErrors && <ErrorList errors={formErrors} />}
    </>
  );
};

export default PostFormUpdate;
