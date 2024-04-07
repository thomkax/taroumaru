import AchievementTag from "./tags";
import { AchievementMetadata } from "./types";

const metadata: AchievementMetadata = {
  // Mondstadt
  "84520": {
    // "In the Name of Favonius"
    tasks: 4,
    tags: [AchievementTag.Commission, AchievementTag.Mondstadt],
  },
  "84527": {
    // "Get Your Own Emergency Food!"
    tags: [AchievementTag.Commission, AchievementTag.Mondstadt],
  },
  "84501": {
    // "...Odomu?"
    tags: [AchievementTag.Commission, AchievementTag.Mondstadt],
  },
  "84502": {
    // "Yo dala?"
    tags: [AchievementTag.Commission, AchievementTag.Mondstadt],
  },
  "84519": {
    // "Marvelous Medicine"
    tags: [AchievementTag.Commission, AchievementTag.Mondstadt],
  },
  "84054": {
    // "Anna's Adventures"
    tags: [AchievementTag.Commission, AchievementTag.Mondstadt],
  },
  "84515": {
    // "Taking Responsibility for Your Actions"
    tags: [AchievementTag.Commission, AchievementTag.Mondstadt],
  },
  "84518": {
    // "Dear Daddy..."
    tags: [AchievementTag.Commission, AchievementTag.Mondstadt],
  },
  "84503": {
    // "Perfectionist"
    tasks: 3,
    tags: [AchievementTag.Commission, AchievementTag.Mondstadt],
  },
  "84504": {
    // "Telling It How It Is"
    tasks: 3,
    tags: [AchievementTag.Commission, AchievementTag.Mondstadt],
  },
  "84516": {
    // "Making Do"
    tags: [AchievementTag.Commission, AchievementTag.Mondstadt],
  },

  // Liyue
  "84506": {
    // "Friends, Travelers, Lend Me Your Ears..."
    tasks: 2,
    tags: [AchievementTag.Commission, AchievementTag.Liyue],
  },
  "84507": {
    // "Once Upon a Time..."
    tasks: 1,
    tags: [AchievementTag.Commission, AchievementTag.Liyue],
  },
  "84514": {
    // "Beginner's Luck"
    tags: [AchievementTag.Commission, AchievementTag.Liyue],
  },
  "84509": {
    // "A Nourishing Friendship"
    tasks: 2,
    tags: [AchievementTag.Commission, AchievementTag.Liyue],
  },
  "84505": {
    // "Geo Archon Anecdotes"
    tasks: 4,
    tags: [AchievementTag.Commission, AchievementTag.Liyue],
  },
  "84510": {
    // "Love Is All Around"
    tasks: 5,
    tags: [AchievementTag.Commission, AchievementTag.Liyue],
  },
  "84526": {
    // "Open to Interpretation"
    tasks: 4,
    tags: [AchievementTag.Commission, AchievementTag.Liyue],
  },
  "84523": {
    // "Poet Vs. Paycheck"
    tasks: 1,
    tags: [AchievementTag.Commission, AchievementTag.Liyue],
  },
  "84508": {
    // "Pirates! Argh!"
    tasks: 3,
    tags: [AchievementTag.Commission, AchievementTag.Liyue],
  },
  "84055": {
    // "Prelude to the Journey"
    tags: [AchievementTag.Commission, AchievementTag.Liyue],
  },
  "84513": {
    // "Level Up"
    tags: [AchievementTag.Commission, AchievementTag.Liyue],
  },
  "84565": {
    // "To Walk The Horizon...?"
    tags: [AchievementTag.Commission, AchievementTag.Liyue],
  },
  "84522": {
    // "Scholarly Pretensions"
    tags: [AchievementTag.Commission, AchievementTag.Liyue],
  },
  "84525": {
    // "This Novel Is Amazing!"
    tags: [AchievementTag.Commission, AchievementTag.Liyue],
  },
  "84524": {
    // "All's Well That Ends Well"
    tags: [AchievementTag.Commission, AchievementTag.Liyue],
  },
  "84564": {
    // "Swordseeker"
    tags: [AchievementTag.Commission, AchievementTag.Liyue],
  },

  // Inazuma
  "84539": {
    // "You Should Start A Doushin Dojo"
    tags: [AchievementTag.Commission, AchievementTag.Inazuma],
  },
  "84528": {
    // "Hidden in Plain Sight"
    tags: [AchievementTag.Commission, AchievementTag.Inazuma],
  },
  "84529": {
    // "Is There But One Truth...?"
    tags: [AchievementTag.Commission, AchievementTag.Inazuma],
  },
  "84535": {
    // "\"Sorry for the Trouble!\""
    tags: [AchievementTag.Commission, AchievementTag.Inazuma],
  },
  "84538": {
    // "Editorial Opinion"
    tasks: 2,
    tags: [AchievementTag.Commission, AchievementTag.Inazuma],
  },
  "84531": {
    // "Boom Shaka-Laka, More Boom-Shaka-Laka"
    tasks: 1,
    tags: [AchievementTag.Commission, AchievementTag.Inazuma],
  },
  "84532": {
    // "Meal For Two"
    tasks: 2,
    tags: [AchievementTag.Commission, AchievementTag.Inazuma],
  },
  "84534": {
    // "Samurice"
    tasks: 2,
    tags: [AchievementTag.Commission, AchievementTag.Inazuma],
  },
  "84533": {
    // "A Question of Diet"
    tags: [AchievementTag.Commission, AchievementTag.Inazuma],
  },
  "84530": {
    // "Liyue Ichiban"
    tags: [AchievementTag.Commission, AchievementTag.Inazuma],
  },

  // Sumeru
  "84548": {
    // "It's My Job."
    tasks: 1,
    tags: [AchievementTag.Commission, AchievementTag.Sumeru],
  },
  "84560": {
    // "Scholarly in Sumeru"
    tasks: 6,
    tags: [AchievementTag.Commission, AchievementTag.Sumeru],
  },
  "84563": {
    // "A Lingering Fragrance"
    tasks: 3,
    tags: [AchievementTag.Commission, AchievementTag.Sumeru],
  },
  "84549": {
    // "Relaxation Therapy"
    tasks: 3,
    tags: [AchievementTag.Commission, AchievementTag.Sumeru],
  },
  "84559": {
    // "What's the Matter?"
    tasks: 3,
    tags: [AchievementTag.Commission, AchievementTag.Sumeru],
  },
  "84547": {
    // "Principia Arithmetica"
    tags: [AchievementTag.Commission, AchievementTag.Sumeru],
  },
  "84544": {
    // "Kalimi's Fungus"
    tags: [AchievementTag.Commission, AchievementTag.Sumeru],
  },
  "84545": {
    // "When Wealth Comes A-Knockin"
    tags: [AchievementTag.Commission, AchievementTag.Sumeru],
  },
  "84562": {
    // "Doctor's Handwriting"
    tags: [AchievementTag.Commission, AchievementTag.Sumeru],
  },
  "84546": {
    // "Catch Me-ow if You Can!"
    tasks: 3,
    tags: [AchievementTag.Commission, AchievementTag.Sumeru],
  },
  "84558": {
    // "The Ship Has It"
    tags: [AchievementTag.Commission, AchievementTag.Sumeru],
  },
  "84557": {
    // "Non-Obligatory Request"
    tasks: 3,
    tags: [AchievementTag.Commission, AchievementTag.Sumeru],
  },
  "84561": {
    // "One Step Too Far"
    tags: [AchievementTag.Commission, AchievementTag.Sumeru],
  },
  "84550": {
    // "Up by the Roots"
    tags: [AchievementTag.Commission, AchievementTag.Sumeru],
  },
  "84553": {
    // "The Sky is Vast; The Earth..."
    tasks: 3,
    tags: [AchievementTag.Commission, AchievementTag.Sumeru],
  },

  // Fontaine
  "84568": {
    // "Aesthetic Critique"
    tags: [AchievementTag.Commission, AchievementTag.Fontaine],
  },
  "84567": {
    // "Not Your Average Joe"
    tags: [AchievementTag.Commission, AchievementTag.Fontaine],
  },
  "84571": {
    // "New Inspiration! New Products!"
    tags: [AchievementTag.Commission, AchievementTag.Fontaine],
  },
  "84566": {
    // "Office on the Avenue!"
    tasks: 3,
    tags: [AchievementTag.Commission, AchievementTag.Fontaine],
  },
  "84569": {
    // "Second Childhood"
    tags: [AchievementTag.Commission, AchievementTag.Fontaine],
  },
};

export default metadata;
