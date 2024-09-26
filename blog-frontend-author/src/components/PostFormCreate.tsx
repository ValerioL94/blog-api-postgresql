import { Form, useActionData, useNavigate, useSubmit } from 'react-router-dom';
import { useAuth } from '../provider/context';
import { useEffect, useMemo, useState } from 'react';
import { TinyMCEEVent, TPostCreate, TValidationErrors } from '../types/types';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import ErrorList from './ErrorList';
import { toast } from 'react-toastify';
import CustomButton from './CustomButton';

const PostFormCreate = () => {
  const { authData } = useAuth();
  const initialFormState: TPostCreate = useMemo(
    () => ({
      title: '',
      content: '',
      published: 'false',
      authorId: authData!.user.id,
    }),
    [authData]
  );
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
  const handleFormReset = () => {
    setFormData(initialFormState);
    setFormErrors(null);
  };
  useEffect(() => {
    if (response) {
      const { errors } = response as { errors: TValidationErrors };
      if (errors) {
        return setFormErrors(errors);
      } else {
        toast.success('Post created!', { autoClose: 2000 });
        navigate('/posts', { replace: true });
      }
    }
  }, [response, navigate]);
  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          submit({ ...formData, token: authData!.token }, { method: 'POST' });
        }}
        className='p-1'
        method='POST'
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
        <div className='flex justify-between'>
          <CustomButton type='submit' content='Submit' />
          <CustomButton content='Reset' onClick={handleFormReset} />
        </div>
      </Form>
      {formErrors && <ErrorList errors={formErrors} />}
    </>
  );
};

export default PostFormCreate;
