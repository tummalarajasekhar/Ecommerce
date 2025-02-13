import React from 'react'
import heroImg from '../assets/contentl.png'
function Content() {
    return (
        <>
        <div className=' '>
            <div className='flex flex-col justify-evenly items-center  pt-8 w-full  lg:flex-row lg:items-center lg:py-[5%] '>
                {/* left image */}
            <div id='left' className='    scale-80'>
                        <div   style={{ backgroundImage: `url(${heroImg})` }}    className=" animate-[moveUpDown_1s_ease-in-out_infinite_alternate] w-[600px] h-[400px] bg-contain bg-no-repeat z-30  flex justify-center transition-transform duration-500 hover:scale-110 hover:rotate-6 lg:w-[600px] lg:h-[600px]" > </div>
                        
                </div>
                
                {/* <div id='left' className=' zen-dotsr w-[50%] h-[80%] text-transparent bg-clip-text bg-white    pl-[10%] text-[60px] stroke-text '>LEVEL UP WITH THE PS5 EXPERIENCE</div> */}
                <div id='right' className='w-full  max-w-[80%] mx-auto   animate-slide-in '>
                <div  className=' rubik mb-2  text-transparent bg-clip-text   text-5xl  bg-[#FBB80F]  text-center md:text-[4rem]    '>PS5 Paradise: Level Up Your Setup – Don’t Miss Out!
                
                </div>
                <a href="/products" class="hover:tilt-button hover:scale-105 transition-transform duration-500 hover:bg-[#FBEE0F]  mb-[15%] px-4 py-2 max-w-[50%] mx-auto  flex justify-center   bg-[#FBB80F] font-bold text-lg rounded hover:rotate-6  md:text-4xl md:mt-12 ">
                        Shop Now!
                    </a>
                    </div>
                    


            </div>
            </div>
        </>
    )
}

export default Content