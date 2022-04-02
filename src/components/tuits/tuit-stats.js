import React from "react";

const TuitStats = ({tuit, likeTuit, dislikeTuit = () => {}}) => {
    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"></i>
          {tuit.stats &&
          <span className="ttr-stats-replies">{tuit.stats.replies}</span>
          }
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"></i>
          {tuit.stats &&
          <span className="ttr-stats-retuits">{tuit.stats.retuits}</span>
          }
        </div>
        <div className="col">
        <span onClick={() => likeTuit(tuit)}>
                  {
                      tuit.stats  && tuit.stats.likes ? <i className="fa-solid fa-thumbs-up" style={{color: 'blue'}}/> :
                          <i className="fa-solid fa-thumbs-up"/>
                  }
                    {tuit.stats && tuit.stats.likes}
                </span>
        </div>
        <div className="col">
        <span onClick={()=> dislikeTuit(tuit)}>
                    {
                        tuit.stats && tuit.stats.dislikes ? <i className="fa-solid fa-thumbs-down" style={{color: 'blue'}}/> :
                            <i className="fa-solid fa-thumbs-down"/>
                    }
                    {tuit.stats && tuit.stats.dislikes}
                </span>
      </div>
        <div className="col">
          <i className="far fa-inbox-out"></i>
        </div>
      </div>
    );
}
export default TuitStats;