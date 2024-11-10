import React from 'react'

const TextArea = ({ handleChange,value }: { handleChange: React.ChangeEventHandler<HTMLTextAreaElement>, value:string }) => {
    return (
        <div className='mb-6'>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
            <textarea
                id="message"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border-2 border-slate-500"
                placeholder="Describe your Project..."
                onChange={handleChange}
                value={value}
            />
        </div>
    )
}

export default TextArea
