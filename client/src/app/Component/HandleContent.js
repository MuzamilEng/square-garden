import React, {useEffect, useState} from 'react';
import { homePageContent } from '../Data';
import { useGlobalContext } from '../UserContext/UserContext';
import { useForm, Controller } from 'react-hook-form';
import { useUpdateHomeContentMutation } from '../store/storeApi';
import { useNavigate } from 'react-router-dom';

const HandleContent = () => {
    const [updateHomeContent] = useUpdateHomeContentMutation();
    const { contentdetails, setContentdetails, setHandleResult, content, } = useGlobalContext();
    const [headerImageURL, setHeaderImageURL] = useState();
    const navigate = useNavigate();
    const id = content[0]?._id;

    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            headerTitle: contentdetails?.headerTitle,
            headerText: contentdetails?.headerText,
            headerImage: contentdetails?.headerImage,
            rentRoom: contentdetails?.rentRoom,
            privateRoom: contentdetails?.privateRoom,
            mainImage1: contentdetails?.mainImage1,
            mainImage2: contentdetails?.mainImage2,
            mainImage3: contentdetails?.mainImage3,
            mainImage4: contentdetails?.mainImage4,
            mainDescription: contentdetails?.mainDescription,
            mainLocation: contentdetails?.mainLocation,
            mainCommunity: contentdetails?.mainCommunity,
            mainPara: contentdetails?.mainPara,
            bannerText: contentdetails?.bannerText,
            bannerButton: contentdetails?.bannerButton,
            sectionTitle: contentdetails?.sectionTitle,
            sectionText: contentdetails?.sectionText,
            footerLinks: contentdetails?.footerLinks,
            footerDescription: contentdetails?.footerDescription,
            footerText: contentdetails?.footerText,
            footerLogoImage: contentdetails?.footerLogoImage,
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContentdetails({ ...contentdetails, [name]: value });
        setValue(name, value);
        
    };

    const handleImageChange = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];
        if (file) {
            setContentdetails({ ...contentdetails, [e.target.name]: e.target.files[0] });
        }
    };
    
    // const reader = new FileReader();
    // reader.onload = () => {
    //     const imageUrl = reader.result;
    //     setContentdetails({ ...contentdetails, [e.target.name]: e.target.files[0] });
    //     setValue(name, imageUrl);
    //     console.log('imageUrl', imageUrl);
    // };
    // reader.readAsDataURL(file);
    
    console.log('contentdetails', contentdetails);
    const onSubmit = async (data) => {
        data.id = id;
        const formData = new FormData();

        // Append text data to formData
        for (const key in data) {
            if (data[key] !== undefined) {
                formData.append(key, data[key]);
            }
        }

        // Append images to formData
        formData.append('headerImage', contentdetails?.headerImage);
        formData.append('footerLogoImage', contentdetails?.footerLogoImage);
        formData.append('mainImage1', contentdetails?.mainImage1);
        formData.append('mainImage2', contentdetails?.mainImage2);
        formData.append('mainImage3', contentdetails?.mainImage3);
        formData.append('mainImage4', contentdetails?.mainImage4);
        console.log(formData, 'result');

        const result = await updateHomeContent({ id, data: formData });
        setHandleResult(result);
        navigate('/');
        console.log(result, "from onsubmit");
    };

    return (
        <div>
            <main className='w-full bg-[#fff]'>
                <form onSubmit={handleSubmit(onSubmit)} className='' encType='multipart/form-data'>
                    {homePageContent?.map((item, index) => {
                        return <main key={index}>
                            <h1 className='text-black text-center font-bold text-3xl underline pt-[2rem]'>{item?.title}</h1>
                            {item?.form?.map((field2, index) => {
                                return <div className="flex flex-col justify-center items-center p-4" key={index}>
                                    <label className='text-black ' htmlFor={field2?.label}>{field2?.label}</label>
                                    <Controller
                                        name={field2?.name}
                                        control={control}
                                        rules={field2?.rules}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type={field2?.type}
                                                onChange={handleInputChange}
                                                className={`w-1/2 p-2 m-[1rem] focus:outline-none overflow-hidden font-semibold focus:shadow-md border-gray-300 border-[1px] rounded-md`}
                                                placeholder={field?.placeholder}
                                            />
                                        )}
                                    />

                                    {errors[field2?.name] && <p className='text-red-500'>{errors[field2?.name]?.message}</p>}
                                </div>
                            })}

                        </main>
                    })}
                        <div className="flex flex-col justify-center items-center">
                            <label htmlFor="headerImage" className="text-black">Header Image</label>
                            <img src={contentdetails?.headerImage ? contentdetails?.headerImage : headerImageURL} className="w-[50rem] h-[20rem] rounded-md" alt="Current Header Image" />
                            <input type="file" name="headerImage" className="w-1/2 p-2 m-[1rem] focus:outline-none overflow-hidden font-semibold focus:shadow-md border-gray-300 border-[1px] rounded-md" onChange={handleImageChange} />
                        </div>

                   <div className="flex flex-col justify-center items-center">
                        <label htmlFor="footerLogoImage" className='text-black'>Footer Image</label>
                        <img src={contentdetails.footerLogoImage} className='w-[50rem] h-[20rem] rounded-md' alt="Current Header Image" />
                        <input type="file" name="footerLogoImage" className='w-1/2 p-2 m-[1rem] focus:outline-none overflow-hidden font-semibold focus:shadow-md border-gray-300 border-[1px] rounded-md' onChange={handleImageChange} />
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="flex items-center flex-col">
                            <label htmlFor="mainImage1" className='text-black'>Main Images</label>
                            <img src={contentdetails.mainImage1} className='w-[20rem] m-3 h-[20rem] rounded-md' />
                            <input type="file" name="mainImage1" className='w-1/2 p-2 m-[1rem] focus:outline-none overflow-hidden font-semibold focus:shadow-md border-gray-300 border-[1px] rounded-md' onChange={handleImageChange} />
                        </div>
                         <div className="flex items-center flex-col">
                            <label htmlFor="mainImage2" className='text-black'>Main Images</label>
                            <img src={contentdetails.mainImage2} className='w-[20rem] m-3 h-[20rem] rounded-md' />
                            <input type="file" name="mainImage2" className='w-1/2 p-2 m-[1rem] focus:outline-none overflow-hidden font-semibold focus:shadow-md border-gray-300 border-[1px] rounded-md' onChange={handleImageChange} />
                        </div>
                        <div className="flex items-center flex-col">
                            <label htmlFor="mainImage3" className='text-black'>Main Images</label>
                            <img src={contentdetails.mainImage3} className='w-[20rem] m-3 h-[20rem] rounded-md' />
                            <input type="file" name="mainImage3" className='w-1/2 p-2 m-[1rem] focus:outline-none overflow-hidden font-semibold focus:shadow-md border-gray-300 border-[1px] rounded-md' onChange={handleImageChange} />
                        </div>
                       <div className="flex items-center flex-col">
                            <label htmlFor="mainImage4" className='text-black'>Main Images</label>
                            <img src={contentdetails.mainImage4} className='w-[20rem] m-3 h-[20rem] rounded-md' />
                            <input type="file" name="mainImage4" className='w-1/2 p-2 m-[1rem] focus:outline-none overflow-hidden font-semibold focus:shadow-md border-gray-300 border-[1px] rounded-md' onChange={handleImageChange} />
                        </div>
                    </div>
                    <div className="flex justify-center items-center"><button className='p-2 text-black font-semibold mb-4 rounded-md border-[1px] border-black'>Update</button></div>
                </form>
            </main>
        </div>
    )
}

export default HandleContent