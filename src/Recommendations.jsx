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
      const score1 = calculateScore(selectedPackages[0]);
      const score2 = calculateScore(selectedPackages[1]);
      const difference = Math.abs(score1 - score2).toFixed(2);
      const RecommendedPackage =
        score1 > score2 ? selectedPackages[0] : selectedPackages[1];
      const NotRecommendedPackage =
        score1 > score2 ? selectedPackages[1] : selectedPackages[0];

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
          <div className="recommendation-header">
            <div className="highlight">
              {recommendation.RecommendedPackage.packageName} is
            </div>
            <div className="highlight">
              <strong> {recommendation.difference}x</strong> better!
            </div>
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
