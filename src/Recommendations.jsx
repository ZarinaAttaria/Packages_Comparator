import React from "react";
import { useSelector } from "react-redux";
import "./App.css";

const Recommendations = () => {
  const selectedPackages = useSelector(
    (state) => state.packages.selectedPackages
  );

  const calculateScore = (pkg) => {
    const { downloads, communityInterest, carefullness } = pkg;
    const downloadsPercentage = 0.5;
    const communityInterestPercentage = 0.2;
    const carefullnessPercentage = 0.3;

    const downloadsScore = downloads * downloadsPercentage;
    const communityInterestScore =
      communityInterest * communityInterestPercentage;
    const carefullnessScore = carefullness * carefullnessPercentage;
    const totalScore =
      downloadsScore + communityInterestScore + carefullnessScore;
    return totalScore;
  };

  const getRecommendation = () => {
    if (selectedPackages.length >= 2) {
      const scores = selectedPackages.map((pkg) => ({
        ...pkg,
        score: calculateScore(pkg),
      }));
      scores.sort((a, b) => b.score - a.score);

      const RecommendedPackage = scores[0];
      const NotRecommendedPackage = scores.slice(1);
      const difference = Math.abs(
        RecommendedPackage.score - NotRecommendedPackage[0].score
      ).toFixed(2);

      return {
        RecommendedPackage,
        NotRecommendedPackage,
        difference,
      };
    }
    return null;
  };

  const recommendation = getRecommendation();

  return (
    <div className="recommendations-container">
      <h3 className="recommendation-heading">Recommendations</h3>
      {recommendation ? (
        <>
          <div className="recommendation-card">
            <div className="highlight">
              <p className="packageName">
                ✨{recommendation.RecommendedPackage.packageName}{" "}
              </p>
              <p className="packageName">is</p>
              <p className="packageName">
                {" "}
                {recommendation.difference > 10000
                  ? (recommendation.difference / 10000).toFixed(1)
                  : recommendation.difference}
                x
              </p>{" "}
              better!✨
            </div>

            <div className="recommended-container">
              <h4 className="recommended-package">
                {recommendation.RecommendedPackage.packageName}
              </h4>
              <span className="badge recommended">recommended</span>
            </div>
            <p className="description">
              {recommendation.RecommendedPackage.description}
            </p>
            <div className="stats">
              <div className="stats-item">
                <p>Downloads</p>
                <strong>
                  {recommendation.RecommendedPackage.downloads > 1000
                    ? (
                        recommendation.RecommendedPackage.downloads / 10000
                      ).toFixed(1) + "K+"
                    : recommendation.RecommendedPackage.downloads.toFixed(1) +
                      "+"}
                </strong>
              </div>
              <div className="stats-item">
                <p>Stars</p>
                <strong>
                  {recommendation.RecommendedPackage.stars > 1000
                    ? (recommendation.RecommendedPackage.stars / 1000).toFixed(
                        1
                      ) + "K+"
                    : recommendation.RecommendedPackage.stars.toFixed(1) + "+"}
                </strong>
              </div>
              <div className="stats-item">
                <p>Health</p>

                <strong>
                  {Math.abs(recommendation.RecommendedPackage.health).toFixed(
                    1
                  )}{" "}
                  %
                </strong>
              </div>
            </div>
            <p className="repository">
              <a href={recommendation.RecommendedPackage.repository}>
                <img src="repo.png" className="icon" />
                Repository
              </a>
              <a href={recommendation.RecommendedPackage.npm}>
                <img src="documentation.png" className="icon" />
                Documentation
              </a>
            </p>

            <div></div>
          </div>
        </>
      ) : (
        <p>Select at least two packages to see the recommendation.</p>
      )}
    </div>
  );
};

export default Recommendations;
