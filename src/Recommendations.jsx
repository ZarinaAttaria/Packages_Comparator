import { useSelector } from "react-redux";

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
      const difference = (score1 - score2).toFixed(2);
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
    <>
      <h3>RECOMMENDATIONS</h3>
      {recommendation ? (
        <>
          <div>
            <h6>{recommendation.RecommendedPackage.packageName}</h6> is
            <h6>{recommendation.difference}x</h6> better!
          </div>
          <div>
            <h4>{recommendation.RecommendedPackage.packageName}</h4>
            <p>{recommendation.RecommendedPackage.description}</p>

            <p>
              <i>Repository: {recommendation.RecommendedPackage.repository}</i>
            </p>
            <p>
              Downloads:
              {recommendation.RecommendedPackage.downloads}+
            </p>
          </div>
        </>
      ) : (
        <p>Select at least two packages to see the recommendation.</p>
      )}
    </>
  );
};

export default Recommendations;
