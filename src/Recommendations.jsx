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
          <div className="highlight">
            <p className="packageName">
              {recommendation.RecommendedPackage.packageName}{" "}
            </p>
            <p className="packageName">is</p>
            <p className="packageName"> {recommendation.difference}x</p> better!
          </div>
          <div className="recommendation-card">
            <div className="recommended-container">
              <h4 className="recommended-package">
                {recommendation.RecommendedPackage.packageName}
              </h4>
              <span className="badge recommended">recommended</span>
            </div>

            <p className="description">
              {recommendation.RecommendedPackage.description}
            </p>
            <p className="repository">
              Repository:{" "}
              <a href={recommendation.RecommendedPackage.repository}>
                {recommendation.RecommendedPackage.repository}
              </a>
            </p>
            <div>
              <div className="stats">
                <p>Downloads:</p>
                <strong>{recommendation.RecommendedPackage.downloads}+</strong>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Select at least two packages to see the recommendation.</p>
      )}
    </div>
  );
};

export default Recommendations;
