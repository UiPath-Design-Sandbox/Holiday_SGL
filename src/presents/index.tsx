// Import your present file here
// import MyPresent from './MyPresent';

export interface PresentData {
    id: string;
    sender: string; // Your name
    postcardImage: string; // URL to a holiday postcard image (or use a placeholder)
    wishes: string; // Your personalized holiday wishes message
    color?: string; // Present box color - use simple color names: 'red', 'blue', 'green', 'purple', 'pink', 'orange', 'yellow', 'teal', 'indigo'
}

// Add your present to this array
export const presents: PresentData[] = [
    {
        id: 'present-1',
        sender: 'Alice',
        postcardImage: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&h=400&fit=crop',
        wishes: 'Wishing you a season filled with warmth, joy, and wonderful memories. May the new year bring you success and happiness in all your endeavors!',
        color: 'red'
    },
    {
        id: 'present-2',
        sender: 'Bob',
        postcardImage: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&h=400&fit=crop',
        wishes: 'May your holidays sparkle with moments of love, laughter, and goodwill. Here\'s to a fantastic year ahead filled with new opportunities!',
        color: 'green'
    },
    {
        id: 'present-3',
        sender: 'Charlie',
        postcardImage: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&h=400&fit=crop',
        wishes: 'Sending you warm wishes for a joyful holiday season and a prosperous new year. Thank you for being such an amazing colleague!',
        color: 'blue'
    },
    {
        id: 'present-4',
        sender: 'Krishna',
        postcardImage: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&h=400&fit=crop',
        wishes: 'Sending you warm wishes for a joyful holiday season and a prosperous new year. Thank you for being such an amazing colleague!',
        color: 'Orange'
    },
    {
        id: 'present-5',
        sender: 'Sarah',
        postcardImage: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&h=400&fit=crop',
        wishes: 'Sending you warm wishes for a joyful holiday season and a prosperous new year. Thank you for being such an amazing colleague!',
        color: 'Purple'
    },
    {
        id: 'present-6',
        sender: 'Sarah',
        postcardImage: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&h=400&fit=crop',
        wishes: 'Sending you warm wishes for a joyful holiday season and a prosperous new year. Thank you for being such an amazing colleague!',
        color: 'purple'
    },
    {
        id: 'present-7',
        sender: 'David',
        postcardImage: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&h=400&fit=crop',
        wishes: 'May this holiday season bring you peace, happiness, and all the wonderful things you deserve!',
        color: 'pink'
    },
    {
        id: 'present-8',
        sender: 'Emma',
        postcardImage: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&h=400&fit=crop',
        wishes: 'Wishing you a magical holiday filled with love, laughter, and cherished moments with those you hold dear!',
        color: 'yellow'
    },
    {
        id: 'present-9',
        sender: 'Frank',
        postcardImage: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&h=400&fit=crop',
        wishes: 'Here\'s to a season of joy, a year of success, and a lifetime of wonderful memories together!',
        color: 'teal'
    },
    {
        id: 'present-10',
        sender: 'Grace',
        postcardImage: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&h=400&fit=crop',
        wishes: 'May your holidays be merry and bright, and may the new year bring you endless opportunities!',
        color: 'indigo'
    },
    {
        id: 'present-11',
        sender: 'Henry',
        postcardImage: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&h=400&fit=crop',
        wishes: 'Sending you warmest holiday greetings and best wishes for a fantastic year ahead!',
        color: 'red'
    },
    {
        id: 'present-12',
        sender: 'Isabella',
        postcardImage: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&h=400&fit=crop',
        wishes: 'May this festive season fill your heart with joy and your home with laughter!',
        color: 'green'
    },
    {
        id: 'present-13',
        sender: 'Jack',
        postcardImage: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&h=400&fit=crop',
        wishes: 'Wishing you a wonderful holiday season and a new year filled with success and happiness!',
        color: 'blue'
    },
    {
        id: 'present-14',
        sender: 'Katherine',
        postcardImage: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&h=400&fit=crop',
        wishes: 'May the magic of the holidays bring you peace, love, and endless joy!',
        color: 'purple'
    },
    {
        id: 'present-15',
        sender: 'Liam',
        postcardImage: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&h=400&fit=crop',
        wishes: 'Here\'s to celebrating the season with those who matter most. Happy holidays!',
        color: 'orange'
    },
    {
        id: 'present-16',
        sender: 'Mia',
        postcardImage: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&h=400&fit=crop',
        wishes: 'Wishing you a season filled with warmth, joy, and wonderful memories!',
        color: 'pink'
    },
    {
        id: 'present-17',
        sender: 'Noah',
        postcardImage: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&h=400&fit=crop',
        wishes: 'May your holidays sparkle with moments of love, laughter, and goodwill!',
        color: 'yellow'
    },
    {
        id: 'present-18',
        sender: 'Olivia',
        postcardImage: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&h=400&fit=crop',
        wishes: 'Sending you warm wishes for a joyful holiday season and a prosperous new year!',
        color: 'teal'
    },
    {
        id: 'present-19',
        sender: 'Paul',
        postcardImage: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&h=400&fit=crop',
        wishes: 'May the new year bring you success and happiness in all your endeavors!',
        color: 'indigo'
    },
    {
        id: 'present-20',
        sender: 'Quinn',
        postcardImage: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&h=400&fit=crop',
        wishes: 'Wishing you a fantastic year ahead filled with new opportunities and great adventures!',
        color: 'red'
    },
    {
        id: 'present-21',
        sender: 'Rachel',
        postcardImage: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&h=400&fit=crop',
        wishes: 'Thank you for being such an amazing colleague! Happy holidays and happy new year!',
        color: 'green'
    },
    {
        id: 'present-22',
        sender: 'Samuel',
        postcardImage: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&h=400&fit=crop',
        wishes: 'May your holidays be filled with peace, love, and all the things that make you smile!',
        color: 'blue'
    },
    {
        id: 'present-23',
        sender: 'Tara',
        postcardImage: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&h=400&fit=crop',
        wishes: 'Here\'s to a season of joy and a year of success. Wishing you all the best!',
        color: 'purple'
    },
    {
        id: 'present-24',
        sender: 'Victor',
        postcardImage: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&h=400&fit=crop',
        wishes: 'May the spirit of the holidays fill your heart with warmth and happiness!',
        color: 'orange'
    },
    {
        id: 'present-25',
        sender: 'Wendy',
        postcardImage: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&h=400&fit=crop',
        wishes: 'Wishing you a magical holiday season and a wonderful new year ahead!',
        color: 'pink'
    },
    {
        id: 'present-26',
        sender: 'Xavier',
        postcardImage: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&h=400&fit=crop',
        wishes: 'May your holidays be merry and bright, filled with love and laughter!',
        color: 'yellow'
    },
    {
        id: 'present-27',
        sender: 'Yara',
        postcardImage: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&h=400&fit=crop',
        wishes: 'Sending you warmest holiday greetings and best wishes for the coming year!',
        color: 'teal'
    },
    {
        id: 'present-28',
        sender: 'Zachary',
        postcardImage: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&h=400&fit=crop',
        wishes: 'May this festive season bring you joy, peace, and all the happiness you deserve!',
        color: 'indigo'
    },
    {
        id: 'present-29',
        sender: 'Amanda',
        postcardImage: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&h=400&fit=crop',
        wishes: 'Wishing you a season filled with wonderful memories and a new year full of possibilities!',
        color: 'red'
    },
    {
        id: 'present-30',
        sender: 'Benjamin',
        postcardImage: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&h=400&fit=crop',
        wishes: 'Here\'s to celebrating the holidays with those who matter most. Happy holidays!',
        color: 'green'
    },
    // 👇 ADD YOUR PRESENT BELOW - Just uncomment("cmd + /" in mac, "ctrl + /" in windows) and fill in your details! 👇
    // {
    //     id: 'present-yourname',           // Unique ID (e.g., 'present-krishna')
    //     sender: 'Your Name',              // Your name as it should appear
    //     postcardImage: 'IMAGE_URL_HERE',  // Holiday image URL (find at unsplash.com/s/photos/christmas)
    //     wishes: 'Your personalized holiday wishes message goes here...', // Your message
    //     color: 'red'                      // Color: red, blue, green, purple, pink, orange, yellow, teal, indigo
    // },
];
