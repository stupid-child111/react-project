import { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import { Image, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';

const MessagesInput = () => {
  const [text, setText] = useState("");
  const [imgPreview, setImgPreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {  
      toast.error("请上传图片文件");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result);
    }
    reader.readAsDataURL(file);
  };

  const removeImage = (e) => {
    setImgPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!text.trim() && !imgPreview) return;
    try {
      await sendMessage({
        text: text.trim(),
        image: imgPreview,
      });

      //清楚表单
      setText("");
      setImgPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.log("发送消息失败", error)
    }
  };
  return (
    <div className="p-4 w-full">
      {imgPreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imgPreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
        <div className="flex-1 flex gap-2">
          <input
            type='text'
            className='w-full input input-bordered rounded-lg input-sm sm:input-md'
            placeholder='输入消息...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept='image/*'
            className='hidden'
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type='button'
            className={`hidden sm:flex btn btn-circle
            ${imgPreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type='submit'
          className='btn btn-sm btn-circle'
          disabled={!text.trim() && !imgPreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  )
}

export default MessagesInput