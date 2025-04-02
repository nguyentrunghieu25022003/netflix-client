import classNames from "classnames/bind";
import styles from "./question.module.scss";
import Question from "../../../components/question/question";
import MailBox from "../../../components/mail/mail";

const cx = classNames.bind(styles);

const questions = [
  {
    title: "What is Netflix?",
    desc_1:
      "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    desc_2:
      "You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!",
  },
  {
    title: "How much does Netflix cost?",
    desc_1:
      "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from 70,000 ₫ to 260,000 ₫ a month. No extra costs, no contracts.",
  },
  {
    title: "Where can I watch?",
    desc_1:
      "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.",
    desc_2:
      "You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
  },
  {
    title: "How do I cancel?",
    desc_1:
      "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.",
  },
  {
    title: "What can I watch on Netflix?",
    desc_1:
      "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.",
  },
  {
    title: "Is Netflix good for kids?",
    desc_1:
      "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.",
    desc_2:
      "Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.",
  },
];

const Questions = () => {
  const user = localStorage.getItem("user");
  return (
    <div className={cx("questions")}>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <h2>Frequently Asked Questions</h2>
            <div className={cx("question-list")}>
              {questions.map((question, index) => {
                return (
                  <Question
                    key={index}
                    title={question.title}
                    desc={[question.desc_1, question.desc_2]}
                  />
                );
              })}
            </div>
            {!user && (
              <>
                <p style={{ padding: "25px 0 20px 0" }}>
                  Ready to watch? Enter your email or mobile number to create
                  orrestart your membership.
                </p>
                <MailBox />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
