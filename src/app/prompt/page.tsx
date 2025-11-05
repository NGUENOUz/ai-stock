import { AdBannerSlider } from '@/components/adBannSlider'
import HeaderComponent from '@/components/header'
import React from 'react'
import Link from 'next/link';
import "../../styles/prompt.scss"
import { IconCopy, IconEye, IconEyeCancel, IconEyeCheck, IconEyeClosed, IconEyePlus, IconSeeding, IconShare } from '@tabler/icons-react';

const prompt = () => {
  return (
        <main className='parentPage'>
            <AdBannerSlider ads={[]}/>
            
            <div className='container'>
                <h2>Liste des prompts</h2>
                <div className="filterBar">
                    <span><input type="search" name="" id="" placeholder='Entrez quelque chose...'/></span>
                    <span className="categorieFilter">
                        <span>categories</span>
                        <select name="categories" id="">
                            <option value="ALL">ALL</option>
                            <option value="Populiare">Populaire</option>
                        </select>
                    </span>
                    
                    <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold hover:from-emerald-600 hover:to-green-600 transition-colors duration-200">
                       <Link href={""}>Ajouter un prompt</Link>
                    </span>
                </div>

                <div className="promptList">
                    <div className="promptCart">
                        <div className="preview">
                          <img src="https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </div>
                        <div className="description">
                           
                           <h3>Prompt <span className="cat">#Image</span> <span className='tolls'>#ChatGpt</span></h3>
                           <span className="promptTexte">
                            <span>"Voici le prompt qui te permet de generer des meileurs images de chats sur chatGpt zefzev vzevz zvéfze ... "</span>
                            
                           </span>

                            
                            <span className="otherOption">
                                <span ><IconEyePlus width={15} height={15}/></span>
                                <span><IconCopy width={15} height={15}/></span>
                                <span><IconShare width={15} height={15}/></span>
                                
                            </span>
                           
                        </div>
                    </div>

                    <div className="promptCart">
                        <div className="preview">
                          <img src="https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </div>
                        <div className="description">
                           
                           <h3>Prompt <span className="cat">#Image</span> <span className='tolls'>#ChatGpt</span></h3>
                           <span className="promptTexte">
                            <span>"Voici le prompt qui te permet de generer des meileurs images de chats sur chatGpt zefzev vzevz zvéfze ... "</span>
                            
                           </span>

                            
                            <span className="otherOption">
                                <span ><IconEyePlus width={15} height={15}/></span>
                                <span><IconCopy width={15} height={15}/></span>
                                <span><IconShare width={15} height={15}/></span>
                                
                            </span>
                           
                        </div>
                    </div>
                   <div className="promptCart">
                        <div className="preview">
                          <img src="https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </div>
                        <div className="description">
                           
                           <h3>Prompt <span className="cat">#Image</span> <span className='tolls'>#ChatGpt</span></h3>
                           <span className="promptTexte">
                            <span>"Voici le prompt qui te permet de generer des meileurs images de chats sur chatGpt zefzev vzevz zvéfze ... "</span>
                            
                           </span>

                            
                            <span className="otherOption">
                                <span ><IconEyePlus width={15} height={15}/></span>
                                <span><IconCopy width={15} height={15}/></span>
                                <span><IconShare width={15} height={15}/></span>
                                
                            </span>
                           
                        </div>
                    </div>
                    <div className="promptCart">
                        <div className="preview">
                          <img src="https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </div>
                        <div className="description">
                           
                           <h3>Prompt <span className="cat">#Image</span> <span className='tolls'>#ChatGpt</span></h3>
                           <span className="promptTexte">
                            <span>"Voici le prompt qui te permet de generer des meileurs images de chats sur chatGpt zefzev vzevz zvéfze ... "</span>
                            
                           </span>

                            
                            <span className="otherOption">
                                <span ><IconEyePlus width={15} height={15}/></span>
                                <span><IconCopy width={15} height={15}/></span>
                                <span><IconShare width={15} height={15}/></span>
                                
                            </span>
                           
                        </div>
                    </div>
                    <div className="promptCart">
                        <div className="preview">
                          <img src="https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </div>
                        <div className="description">
                           
                           <h3>Prompt <span className="cat">#Image</span> <span className='tolls'>#ChatGpt</span></h3>
                           <span className="promptTexte">
                            <span>"Voici le prompt qui te permet de generer des meileurs images de chats sur chatGpt zefzev vzevz zvéfze ... "</span>
                            
                           </span>

                            
                            <span className="otherOption">
                                <span ><IconEyePlus width={15} height={15}/></span>
                                <span><IconCopy width={15} height={15}/></span>
                                <span><IconShare width={15} height={15}/></span>
                                
                            </span>
                           
                        </div>
                    </div>
                    <div className="promptCart">
                        <div className="preview">
                          <img src="https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </div>
                        <div className="description">
                           
                           <h3>Prompt <span className="cat">#Image</span> <span className='tolls'>#ChatGpt</span></h3>
                           <span className="promptTexte">
                            <span>"Voici le prompt qui te permet de generer des meileurs images de chats sur chatGpt zefzev vzevz zvéfze ... "</span>
                            
                           </span>

                            
                            <span className="otherOption">
                                <span ><IconEyePlus width={15} height={15}/></span>
                                <span><IconCopy width={15} height={15}/></span>
                                <span><IconShare width={15} height={15}/></span>
                                
                            </span>
                           
                        </div>
                    </div>
                    <div className="promptCart">
                        <div className="preview">
                          <img src="https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </div>
                        <div className="description">
                           
                           <h3>Prompt <span className="cat">#Image</span> <span className='tolls'>#ChatGpt</span></h3>
                           <span className="promptTexte">
                            <span>"Voici le prompt qui te permet de generer des meileurs images de chats sur chatGpt zefzev vzevz zvéfze ... "</span>
                            
                           </span>

                            
                            <span className="otherOption">
                                <span ><IconEyePlus width={15} height={15}/></span>
                                <span><IconCopy width={15} height={15}/></span>
                                <span><IconShare width={15} height={15}/></span>
                                
                            </span>
                           
                        </div>
                    </div>
                    <div className="promptCart">
                        <div className="preview">
                          <img src="https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                        </div>
                        <div className="description">
                           
                           <h3>Prompt <span className="cat">#Image</span> <span className='tolls'>#ChatGpt</span></h3>
                           <span className="promptTexte">
                            <span>"Voici le prompt qui te permet de generer des meileurs images de chats sur chatGpt zefzev vzevz zvéfze ... "</span>
                            
                           </span>

                            
                            <span className="otherOption">
                                <span ><IconEyePlus width={15} height={15}/></span>
                                <span><IconCopy width={15} height={15}/></span>
                                <span><IconShare width={15} height={15}/></span>
                                
                            </span>
                           
                        </div>
                    </div>
                    <div className="promptCart"></div>
                </div>
            </div>

         
        </main>
  )
}

export default prompt
