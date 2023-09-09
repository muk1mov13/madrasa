import React, {useEffect, useState} from 'react';
import Header from "../header/header";
import instance from "../../instance";
import Rodal from 'rodal';
import 'rodal/lib/rodal.css'

function NewsForTeachers(props) {
    const [articles, setArticles] = useState([]);
    const [visible, setVisible] = useState(false);
    const defData = {
        title: '',
        body: '',
        type: '',
        status: false
    }

    useEffect(() => {
        // getArticles();
    }, [])

    function getArticles() {
        try {
            const res = instance('/articles', 'GET')
            if (res) {
                setArticles(res.data);
            }

        } catch (error) {

        }
    }

    function saveArticle() {

    }

    function submitForm(e) {
        e.preventDefault();
    }

    return (
        <div>

            <Header/>

            <div>
                <div style={{margin: '220px 100px 0 100px'}} className={'d-flex justify-content-between'}>
                    <h3>Barcha e'lonlar</h3>
                        <input className={'form-control w-25 mx-2'} placeholder={'search'} type="text"/>
                    <button className={'text-light btn btn-warning'}><b className={'p-3'}>+ E'lon</b></button>
                </div>
                <hr/>
                <div className="news">
                    <div className="container">
                        <div className="row">
                            {/* News Column */}
                            <div className="col-lg-8">
                                <div className="news_posts">
                                    {/* News Post 1 */}
                                    <div className="news_post">
                                        <div className="news_post_top d-flex flex-column flex-sm-row">
                                            <div className="news_post_date_container">
                                                <div
                                                    className="news_post_date d-flex flex-column align-items-center justify-content-center">
                                                    <div>18</div>
                                                    <div>dec</div>
                                                </div>
                                            </div>
                                            <div className="news_post_title_container">
                                                <div className="news_post_title">
                                                    <a href="news_post.html">Why do you need a qualification?</a>
                                                </div>
                                                <div className="news_post_meta">
                                                <span className="news_post_author"><a
                                                    href="#">By Christian Smith</a></span>
                                                    <span>|</span>
                                                    <span className="news_post_comments"><a
                                                        href="#">3 Comments</a></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="news_post_text">
                                            <p>In aliquam, augue a gravida rutrum, ante nisl fermentum nulla, vitae
                                                tempor
                                                nisl ligula vel nunc. Proin quis mi malesuada, finibus tortor fermentum.
                                                Etiam eu purus nec eros varius luctus. Praesent finibus risus facilisis
                                                ultricies.</p>
                                        </div>
                                        <div className="news_post_button text-center trans_200">
                                            <a href="news_post.html">Read More</a>
                                        </div>
                                    </div>
                                    {/* News Post 1 */}
                                    <div className="news_post">
                                        <div className="news_post_top d-flex flex-column flex-sm-row">
                                            <div className="news_post_date_container">
                                                <div
                                                    className="news_post_date d-flex flex-column align-items-center justify-content-center">
                                                    <div>18</div>
                                                    <div>dec</div>
                                                </div>
                                            </div>
                                            <div className="news_post_title_container">
                                                <div className="news_post_title">
                                                    <a href="news_post.html">Why do you need a qualification?</a>
                                                </div>
                                                <div className="news_post_meta">
                                                <span className="news_post_author"><a
                                                    href="#">By Christian Smith</a></span>
                                                    <span>|</span>
                                                    <span className="news_post_comments"><a
                                                        href="#">3 Comments</a></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="news_post_text">
                                            <p>In aliquam, augue a gravida rutrum, ante nisl fermentum nulla, vitae
                                                tempor
                                                nisl ligula vel nunc. Proin quis mi malesuada, finibus tortor fermentum.
                                                Etiam eu purus nec eros varius luctus. Praesent finibus risus facilisis
                                                ultricies.</p>
                                        </div>
                                        <div className="news_post_button text-center trans_200">
                                            <a href="news_post.html">Read More</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Rodal height={350} visible={visible} onClose={() => setVisible(false)}>
                <form onSubmit={submitForm}>
                    <div>
                        <div className={"my-3"}>
                            <h4>e'lon</h4>
                            <input required className={"form-control"} type="text"
                                   placeholder={"e'lon"}
                                   minLength={2}/>
                        </div>
                        <div className={"my-3"}>
                            <h4>qo'shimcha ma'lumot</h4>
                            <textarea required className={"form-control"}
                                      placeholder={"qo'shimcha ma'lumot"}
                                      minLength={5}/>
                        </div>
                        <div>
                            <label className={'d-flex gap-2 align-items-center'}>
                                <h4>aktivligi</h4>
                                <input type="checkbox"/>
                            </label>
                        </div>
                        <button className={"form-control btn btn-primary"}>+ qo'shish</button>
                    </div>
                </form>
            </Rodal>
        </div>
    );
}

export default NewsForTeachers;