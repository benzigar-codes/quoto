import {getRandomBackground, getRandomFont} from './utils';

const defaultKeys = {
  quote: '',
  font: 'BEBAS',
  fontSize: 45,
  backgroundType: 'COLOR',
  quoteColor: 'white',
  backgroundColor: 'black',
  backgroundImage: '',
  quoteVerticalAlign: 'CENTER',
  author: '',
  quoteHorizontalAlign: 'CENTER',
  logoUrl: '',
  ratio: 4 / 5,
};

const motivationQuotes = [
  {
    quote: "Believe you can and you're halfway there.",
    backgroundImage:
      'https://i.pinimg.com/564x/cc/a2/5a/cca25acaa0c578ea31e2b1cb3089d3c9.jpg',
  },
  {
    quote: 'The only way to do great work is to love what you do.',
    backgroundImage:
      'https://i.pinimg.com/564x/e6/5b/a5/e65ba54426d092d7583f08abbcf733fc.jpg',
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    backgroundImage:
      'https://i.pinimg.com/564x/0b/b0/a2/0bb0a21d29caa2227456dcfc325ebdff.jpg',
  },
  {
    quote:
      'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    backgroundImage:
      'https://i.pinimg.com/564x/bb/a4/2e/bba42e9a6985503ef5875db2d56090e3.jpg',
  },
  {
    quote: 'You are never too old to set another goal or to dream a new dream.',
    backgroundImage:
      'https://i.pinimg.com/564x/c6/9d/40/c69d4015a2ebf14bb03b8e2feaff2ddf.jpg',
  },
  {
    quote: 'The future depends on what you do today.',
    backgroundImage:
      'https://i.pinimg.com/736x/4c/df/25/4cdf259cce90216ed80ccd5f4bebb68f.jpg',
  },
  {
    quote:
      "The harder you work for something, the greater you'll feel when you achieve it.",
    backgroundImage:
      'https://i.pinimg.com/564x/c8/e0/e3/c8e0e3a2ebc2b02ecc895d21e6de82c2.jpg',
  },
  {
    quote:
      'The only limit to our realization of tomorrow will be our doubts of today.',
    backgroundImage:
      'https://i.pinimg.com/564x/5b/bf/a8/5bbfa84db6c74e95c760cdc118cfd38b.jpg',
  },
  {
    quote:
      'Success is walking from failure to failure with no loss of enthusiasm.',
    backgroundImage:
      'https://i.pinimg.com/564x/79/2c/b8/792cb8aa3c4b2c19790dc8094d1fdece.jpg',
  },
  {
    quote: 'Dream big and dare to fail.',
    backgroundImage:
      'https://i.pinimg.com/736x/21/f4/5e/21f45eaa68d284ebdb6e02b6ec9cb9f9.jpg',
  },
  {
    quote: 'The secret of getting ahead is getting started.',
    backgroundImage:
      'https://i.pinimg.com/736x/84/ea/7e/84ea7e72db19dd4965027093ce5f9467.jpg',
  },
  {
    quote: "Your time is limited, don't waste it living someone else's life.",
    backgroundImage:
      'https://i.pinimg.com/564x/2c/2d/11/2c2d11d630ca2583053b830853224e89.jpg',
  },
  {
    quote: "Opportunities don't happen. You create them.",
    backgroundImage:
      'https://i.pinimg.com/736x/27/87/45/2787452ac0f130e5f1d8ccd4a5e025cd.jpg',
  },
  {
    quote:
      'The only person you should try to be better than is the person you were yesterday.',
    backgroundImage:
      'https://i.pinimg.com/564x/5e/2f/2e/5e2f2e6e65da883b70069c34b7aa3f09.jpg',
  },
  {
    quote: 'It does not matter how slowly you go as long as you do not stop.',
    backgroundImage:
      'https://i.pinimg.com/564x/0f/ae/10/0fae10f9ef59f38928280dca1442a916.jpg',
  },
  {
    quote:
      "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
    backgroundImage:
      'https://i.pinimg.com/564x/b3/2b/8e/b32b8e4d474023a8158eb51191d015ab.jpg',
  },
  {
    quote:
      'Challenges are what make life interesting, and overcoming them is what makes life meaningful.',
    backgroundImage:
      'https://i.pinimg.com/736x/97/d1/d7/97d1d70d57592b2cbcca746ec04bbb82.jpg',
  },
  {
    quote: 'Success is not in what you have, but who you are.',
    backgroundImage:
      'https://i.pinimg.com/564x/67/64/77/676477c762a633e25580fdb336918138.jpg',
  },
  {
    quote:
      'Hardships often prepare ordinary people for an extraordinary destiny.',
    backgroundImage:
      'https://i.pinimg.com/564x/d2/62/bf/d262bffb1ed0a607cf9617cfaf6113ed.jpg',
  },
  {
    quote:
      'The only way to achieve the impossible is to believe it is possible.',
    backgroundImage:
      'https://i.pinimg.com/564x/78/3a/19/783a193642e4c1459b52aa293076e9d3.jpg',
  },
];

const loveQuotes = [
  {
    quote: 'The best thing to hold onto in life is each other.',
    backgroundImage:
      'https://i.pinimg.com/564x/95/b5/20/95b520e0b25a35d65a8e6c8c5d582c8a.jpg',
  },
  {
    quote:
      'Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.',
    backgroundImage:
      'https://i.pinimg.com/736x/6c/5d/8f/6c5d8fdde5076f7af4cff0a02cb2bc52.jpg',
  },
  {
    quote: 'To love and be loved is to feel the sun from both sides.',
    backgroundImage:
      'https://i.pinimg.com/736x/0e/9e/72/0e9e72c862be5e68c075344d7435af29.jpg',
  },
  {
    quote:
      'In this crazy world, full of change and chaos, there is one thing of which I am certain, one thing which does not change: my love for you.',
    backgroundImage:
      'https://i.pinimg.com/736x/68/98/f2/6898f2dd0308e691ac00a557bb53149d.jpg',
  },
  {
    quote: "Love isn't something you find. Love is something that finds you.",
    backgroundImage:
      'https://i.pinimg.com/736x/80/06/9a/80069a1b361ec8e78d8d14b086b428a3.jpg',
  },
  {
    quote: "A simple 'I love you' means more than money.",
    backgroundImage:
      'https://i.pinimg.com/564x/ca/82/35/ca8235b1a868e2d932d226c609b35e2e.jpg',
  },
  {
    quote:
      'The best love is the kind that awakens the soul and makes us reach for more, that plants a fire in our hearts and brings peace to our minds.',
    backgroundImage:
      'https://i.pinimg.com/564x/d9/9b/e3/d99be3dc77f8de1315280c47671ef1f4.jpg',
  },
  {
    quote: "Love is like the wind, you can't see it but you can feel it.",
    backgroundImage:
      'https://i.pinimg.com/564x/b1/42/13/b14213e72055671337bc0aba9dc42d31.jpg',
  },
  {
    quote:
      'I love you without knowing how, or when, or from where. I love you simply, without problems or pride.',
    backgroundImage:
      'https://i.pinimg.com/736x/58/71/6a/58716af73c32a82413e1131f304834f8.jpg',
  },
  {
    quote:
      'When you realize you want to spend the rest of your life with somebody, you want the rest of your life to start as soon as possible.',
    backgroundImage:
      'https://i.pinimg.com/736x/00/4a/4d/004a4d48c778d149223fc2796217b06a.jpg',
  },
  {
    quote:
      'To be your friend was all I ever wanted; to be your lover was all I ever dreamed.',
    backgroundImage:
      'https://i.pinimg.com/564x/78/10/2c/78102c8c1c04a24ccc9123e9395d8bf6.jpg',
  },
  {
    quote:
      "Love is when the other person's happiness is more important than your own.",
    backgroundImage:
      'https://i.pinimg.com/736x/61/e3/cb/61e3cb25679b4461509757277bd9f323.jpg',
  },
  {
    quote:
      'I am who I am because of you. You are every reason, every hope, and every dream I’ve ever had.',
    backgroundImage:
      'https://i.pinimg.com/736x/05/32/44/053244f6b3772ae5099fdd5ad49dc209.jpg',
  },
  {
    quote:
      'Love is a canvas furnished by nature and embroidered by imagination.',
    backgroundImage:
      'https://i.pinimg.com/564x/7d/0b/81/7d0b815d26da40f8396fa6cd460feef7.jpg',
  },
  {
    quote:
      'I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.',
    backgroundImage:
      'https://i.pinimg.com/564x/12/dd/eb/12ddeb990ff6128ed1957f9e998e2dd8.jpg',
  },
  {
    quote:
      "I choose you. And I'll choose you over and over and over. Without pause, without a doubt, in a heartbeat. I'll keep choosing you.",
    backgroundImage:
      'https://i.pinimg.com/564x/2e/1a/a1/2e1aa1d47268529aa7f893a544c565b2.jpg',
  },
  {
    quote: 'Love is the greatest refreshment in life.',
    backgroundImage:
      'https://i.pinimg.com/736x/01/42/d7/0142d797dc5af79032520d0d2822d473.jpg',
  },
  {
    quote: 'If I know what love is, it is because of you.',
    backgroundImage:
      'https://i.pinimg.com/564x/a4/86/12/a48612a8b2ba2ee6d9ed7e11df24bb84.jpg',
  },
  {
    quote:
      'Love is the only force capable of transforming an enemy into a friend.',
    backgroundImage:
      'https://i.pinimg.com/564x/15/c3/28/15c3288e7fdef3fdd647e560056f4df8.jpg',
  },
  {
    quote:
      'I love you as certain dark things are to be loved, in secret, between the shadow and the soul.',
    backgroundImage:
      'https://i.pinimg.com/564x/85/2e/cc/852eccc40c4020108dd295821da183b7.jpg',
  },
];

const friendshipQuotes = [
  {
    quote: 'A friend is someone who knows all about you and still loves you.',
    backgroundImage: '',
  },
  {
    quote:
      "Friendship is born at that moment when one person says to another, 'What! You too? I thought I was the only one.'",
    backgroundImage: '',
  },
  {
    quote:
      'A real friend is one who walks in when the rest of the world walks out.',
    backgroundImage: '',
  },
  {
    quote:
      'Friendship is the only cement that will ever hold the world together.',
    backgroundImage: '',
  },
  {
    quote:
      'A true friend is someone who is always there during the ups and downs, joys and sorrows.',
    backgroundImage: '',
  },
  {
    quote:
      'Friendship is the inexpressible comfort of feeling safe with a person, having neither to weigh thoughts nor measure words.',
    backgroundImage: '',
  },
  {
    quote:
      'Friendship is not about whom you have known the longest, but about who came and never left your side.',
    backgroundImage: '',
  },
  {
    quote:
      'A friend is someone who listens to your stories, understands your past, and believes in your future.',
    backgroundImage: '',
  },
  {
    quote:
      'Walking with a friend in the dark is better than walking alone in the light.',
    backgroundImage: '',
  },
  {
    quote:
      'A true friend is someone who accepts your past, supports your present, and encourages your future.',
    backgroundImage: '',
  },
  {
    quote:
      "Friendship isn't about being inseparable, but about being separated and knowing nothing will change.",
    backgroundImage: '',
  },
  {
    quote:
      'A friend is one who overlooks your broken fence and admires the flowers in your garden.',
    backgroundImage: '',
  },
  {
    quote: "Friendship is not a big thing. It's a million little things.",
    backgroundImage: '',
  },
  {
    quote:
      'A good friend knows all your best stories, but a best friend has lived them with you.',
    backgroundImage: '',
  },
  {
    quote: 'Friendship is like a rainbow between two hearts.',
    backgroundImage: '',
  },
  {
    quote:
      'The most beautiful discovery true friends make is that they can grow separately without growing apart.',
    backgroundImage: '',
  },
  {
    quote:
      "Friendship isn't about whom you've known the longest. It's about who came and never left your side.",
    backgroundImage: '',
  },
  {
    quote:
      'In the sweetness of friendship, let there be laughter and sharing of pleasures. For in the dew of little things, the heart finds its morning and is refreshed.',
    backgroundImage: '',
  },
  {
    quote:
      "A true friend is someone who is there for you when they'd rather be anywhere else.",
    backgroundImage: '',
  },
  {
    quote: 'Friendship is the only flower that blooms in all seasons.',
    backgroundImage: '',
  },
];

const successQuotes = [
  {
    quote:
      'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    backgroundImage: '',
  },
  {
    quote:
      'Success is walking from failure to failure with no loss of enthusiasm.',
    backgroundImage: '',
  },
  {
    quote:
      'Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.',
    backgroundImage: '',
  },
  {
    quote:
      'Success usually comes to those who are too busy to be looking for it.',
    backgroundImage: '',
  },
  {
    quote: 'The secret to success is to know something nobody else knows.',
    backgroundImage: '',
  },
  {
    quote:
      'The road to success and the road to failure are almost exactly the same.',
    backgroundImage: '',
  },
  {
    quote: 'Success is not in what you have, but who you are.',
    backgroundImage: '',
  },
  {
    quote:
      'The only place where success comes before work is in the dictionary.',
    backgroundImage: '',
  },
  {
    quote:
      "Success is not just about making money. It's about making a difference.",
    backgroundImage: '',
  },
  {
    quote: 'Success is the sum of small efforts, repeated day in and day out.',
    backgroundImage: '',
  },
  {
    quote:
      'Success is not the result of spontaneous combustion. You must set yourself on fire.',
    backgroundImage: '',
  },
  {
    quote: "Success is not about the destination, it's about the journey.",
    backgroundImage: '',
  },
  {
    quote:
      'Success is getting what you want, happiness is wanting what you get.',
    backgroundImage: '',
  },
  {
    quote:
      'Success is the ability to go from one failure to another with no loss of enthusiasm.',
    backgroundImage: '',
  },
  {
    quote:
      'The only way to achieve the impossible is to believe it is possible.',
    backgroundImage: '',
  },
  {
    quote:
      "Success is not just about reaching your goals; it's about who you become in the process.",
    backgroundImage: '',
  },
  {
    quote: 'Success is not for the chosen few, but for the few who choose it.',
    backgroundImage: '',
  },
  {
    quote:
      'Success is the result of preparation, hard work, and learning from failure.',
    backgroundImage: '',
  },
  {
    quote:
      'Success is not defined by how many times you fall, but by how many times you rise.',
    backgroundImage: '',
  },
  {
    quote:
      'Success is not guaranteed, but the opportunity for it is available to all.',
    backgroundImage: '',
  },
];

const inspirationalQuotes = [
  {
    quote: "Believe you can and you're halfway there.",
    backgroundImage: '',
  },
  {
    quote: "Your time is limited, don't waste it living someone else's life.",
    backgroundImage: '',
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    backgroundImage: '',
  },
  {
    quote: 'The future depends on what you do today.',
    backgroundImage: '',
  },
  {
    quote: 'The only way to do great work is to love what you do.',
    backgroundImage: '',
  },
  {
    quote: 'You are never too old to set another goal or to dream a new dream.',
    backgroundImage: '',
  },
  {
    quote:
      'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    backgroundImage: '',
  },
  {
    quote:
      "The harder you work for something, the greater you'll feel when you achieve it.",
    backgroundImage: '',
  },
  {
    quote:
      'The only limit to our realization of tomorrow will be our doubts of today.',
    backgroundImage: '',
  },
  {
    quote: 'Dream big and dare to fail.',
    backgroundImage: '',
  },
  {
    quote: 'The secret of getting ahead is getting started.',
    backgroundImage: '',
  },
  {
    quote: "Opportunities don't happen. You create them.",
    backgroundImage: '',
  },
  {
    quote:
      'The only person you should try to be better than is the person you were yesterday.',
    backgroundImage: '',
  },
  {
    quote: 'It does not matter how slowly you go as long as you do not stop.',
    backgroundImage: '',
  },
  {
    quote:
      "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
    backgroundImage: '',
  },
  {
    quote:
      'Challenges are what make life interesting, and overcoming them is what makes life meaningful.',
    backgroundImage: '',
  },
  {
    quote:
      'Hardships often prepare ordinary people for an extraordinary destiny.',
    backgroundImage: '',
  },
  {
    quote:
      'The only way to achieve the impossible is to believe it is possible.',
    backgroundImage: '',
  },
  {
    quote: 'In the middle of every difficulty lies opportunity.',
    backgroundImage: '',
  },
  {
    quote: 'Life is 10% what happens to us and 90% how we react to it.',
    backgroundImage: '',
  },
];

const funnyQuotes = [
  {
    quote: "I'm not arguing, I'm just explaining why I'm right.",
    backgroundImage: '',
  },
  {
    quote: "I'm on a seafood diet. I see food, and I eat it.",
    backgroundImage: '',
  },
  {
    quote:
      "I told my computer that I needed a break, and now it won't stop sending me Kit Kat bars.",
    backgroundImage: '',
  },
  {
    quote:
      "I'm not shy, I'm just really good at figuring out who's worth talking to.",
    backgroundImage: '',
  },
  {
    quote:
      "I'm not a procrastinator. I'm just extremely productive at unimportant things.",
    backgroundImage: '',
  },
  {
    quote: "I'm not short, I'm fun-sized.",
    backgroundImage: '',
  },
  {
    quote: "I put the 'Me' in 'Mistake', and the 'Fun' in 'Dysfunctional'.",
    backgroundImage: '',
  },
  {
    quote: "I'm not arguing, I'm just explaining why I'm right... again.",
    backgroundImage: '',
  },
  {
    quote:
      "I don't need anger management. You just need to stop making me angry!",
    backgroundImage: '',
  },
  {
    quote:
      "I'm not clumsy. It's just the floor hates me, the table and chairs are bullies, and the walls get in my way.",
    backgroundImage: '',
  },
  {
    quote: 'I may be old, but I got to see all the cool bands.',
    backgroundImage: '',
  },
  {
    quote:
      "I'm not saying I'm Batman, I'm just saying nobody has ever seen me and Batman in the same room.",
    backgroundImage: '',
  },
  {
    quote: "I'm not ignoring you. I'm just prioritizing my awesomeness.",
    backgroundImage: '',
  },
  {
    quote:
      "I'm not arguing, I'm just explaining why I'm right with excessive passion.",
    backgroundImage: '',
  },
  {
    quote: "I'm not clumsy, I'm just overly excited about gravity.",
    backgroundImage: '',
  },
  {
    quote:
      "I'm not a morning person. I'm more of a 'mornings can go jump off a cliff' person.",
    backgroundImage: '',
  },
  {
    quote: "I'm not a complete idiot—there are some parts missing.",
    backgroundImage: '',
  },
  {
    quote: "I'm not weird. I'm limited edition.",
    backgroundImage: '',
  },
  {
    quote:
      "I'm not arguing. I'm just explaining why I'm right, which I am, by the way.",
    backgroundImage: '',
  },
  {
    quote: "I'm not sure how many problems I have because math is one of them.",
    backgroundImage: '',
  },
];

const lifeQuotes = [
  {
    quote: 'Life is 10% what happens to us and 90% how we react to it.',
    backgroundImage: '',
  },
  {
    quote:
      "In the end, it's not the years in your life that count. It's the life in your years.",
    backgroundImage: '',
  },
  {
    quote: 'Life is really simple, but we insist on making it complicated.',
    backgroundImage: '',
  },
  {
    quote: 'The purpose of our lives is to be happy.',
    backgroundImage: '',
  },
  {
    quote:
      'Life is a journey that must be traveled no matter how bad the roads and accommodations.',
    backgroundImage: '',
  },
  {
    quote: "Life is short, and it's up to you to make it sweet.",
    backgroundImage: '',
  },
  {
    quote:
      'Life is like riding a bicycle. To keep your balance, you must keep moving.',
    backgroundImage: '',
  },
  {
    quote:
      'The biggest adventure you can take is to live the life of your dreams.',
    backgroundImage: '',
  },
  {
    quote: 'Life is too important to be taken seriously.',
    backgroundImage: '',
  },
  {
    quote:
      'Life is not about waiting for the storm to pass but learning to dance in the rain.',
    backgroundImage: '',
  },
  {
    quote: "Life isn't about finding yourself. It's about creating yourself.",
    backgroundImage: '',
  },
  {
    quote:
      "Life is like a camera. Focus on the good times, develop from the negatives, and if things don't work out, take another shot.",
    backgroundImage: '',
  },
  {
    quote: "Life is short, and it's up to you to make it sweet.",
    backgroundImage: '',
  },
  {
    quote:
      'Life is an echo. What you send out, comes back. What you sow, you reap. What you give, you get. What you see in others, exists in you.',
    backgroundImage: '',
  },
  {
    quote: 'Life is a balance between holding on and letting go.',
    backgroundImage: '',
  },
  {
    quote: "Life isn't as serious as the mind makes it out to be.",
    backgroundImage: '',
  },
  {
    quote: 'Life is about making an impact, not an income.',
    backgroundImage: '',
  },
  {
    quote:
      "Life is too short to waste your time on people who don't respect, appreciate, and value you.",
    backgroundImage: '',
  },
  {
    quote: 'Life is a one-time offer. Use it well.',
    backgroundImage: '',
  },
  {
    quote:
      "Life isn't about waiting for the storm to pass. It's about learning how to dance in the rain.",
    backgroundImage: '',
  },
];

export const TEMPLATES = [
  {
    name: 'Motivational',
    data: motivationQuotes?.map(each => ({
      ...defaultKeys,
      ...each,
      font: getRandomFont(),
      ratio: 9 / 16,
    })),
  },
  {
    name: 'Love',
    data: loveQuotes?.map(each => ({
      ...defaultKeys,
      ...each,
      font: getRandomFont(),
      ratio: 2 / 3,
    })),
  },
  {
    name: 'Friendship',
    data: friendshipQuotes?.map(each => ({
      ...defaultKeys,
      ...each,
      font: getRandomFont(),
      backgroundImage: getRandomBackground(),
      ratio: 4 / 5,
    })),
  },
  {
    name: 'Success',
    data: successQuotes?.map(each => ({
      ...defaultKeys,
      ...each,
      font: getRandomFont(),
      backgroundImage: getRandomBackground(),
      ratio: 3 / 2,
    })),
  },
  {
    name: 'Inspirational',
    data: inspirationalQuotes?.map(each => ({
      ...defaultKeys,
      ...each,
      font: getRandomFont(),
      backgroundImage: getRandomBackground(),
      ratio: 1 / 1,
    })),
  },
  {
    name: 'Funny',
    data: funnyQuotes?.map(each => ({
      ...defaultKeys,
      ...each,
      font: getRandomFont(),
      backgroundImage: getRandomBackground(),
      ratio: 9 / 16,
    })),
  },
  {
    name: 'Life',
    data: lifeQuotes?.map(each => ({
      ...defaultKeys,
      ...each,
      font: getRandomFont(),
      backgroundImage: getRandomBackground(),
      ratio: 1 / 1,
    })),
  },
  //   {
  //     name: 'Positive',
  //     data: [,],
  //   },
  //   {
  //     name: 'Family',
  //     data: [,],
  //   },
  //   {
  //     name: 'Nature',
  //     data: [,],
  //   },
  //   {
  //     name: 'Art',
  //     data: [,],
  //   },
  //   {
  //     name: 'Time',
  //     data: [,],
  //   },
  //   {
  //     name: 'Travel',
  //     data: [,],
  //   },
  //   {
  //     name: 'Hope',
  //     data: [,],
  //   },
  //   {
  //     name: 'Leadership',
  //     data: [,],
  //   },
];
