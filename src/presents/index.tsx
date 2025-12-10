// Import your present file here
// import MyPresent from './MyPresent';

export interface PresentData {
    id?: string; // Optional - will be auto-generated from sender name
    sender: string; // Your name (use firstname-lastname format, e.g., 'John-Doe')
    postcardImage: string; // URL to a holiday postcard image (or use a placeholder)
    wishes: string; // Your personalized holiday wishes message
    color?: string; // Present box color - use simple color names: 'red', 'blue', 'green', 'purple', 'pink', 'orange', 'yellow', 'teal', 'indigo'
}

// Helper function to generate ID from sender name
// Converts "Firstname-Lastname" or "Firstname Lastname" to "present-firstname-lastname"
function generateIdFromSender(sender: string): string {
    return `present-${sender.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;
}

// Raw presents data (without IDs)
const rawPresents: Omit<PresentData, 'id'>[] = [
    {
        sender: 'Sarah Halverson',
        postcardImage: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&h=400&fit=crop',
        wishes: 'Wishing you a season filled with warmth, joy, and wonderful memories. May the new year bring you success and happiness in all your endeavors!',
        color: 'red'
    },
    {
        sender: 'Krishna Sistla',
        postcardImage: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&h=400&fit=crop',
        wishes: 'May your holidays sparkle with moments of love, laughter, and goodwill. Here\'s to a fantastic year ahead filled with new opportunities!',
        color: 'green'
    },
    {
        sender: 'Olena Kosinska',
        postcardImage: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTNvZzcwaWtmaDh3NDczZWc4NGFycjB5emNoODNpc2NwaGk1YjVzOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/J3CQOSW996lsrqKRYS/giphy.gif?w=600&h=400&fit=crop',
        wishes: 'May your pixels be crisp, your prototypes behave, your Figma libraries stay synced, and your 2026 backlog magically transform into “already shipped.',
        color: 'teal'
    },
    {
        sender: 'Hadley Robin',
        postcardImage: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&h=400&fit=crop',
        wishes: 'Sending you warm wishes for a joyful holiday season and a prosperous new year. Thank you for being such an amazing colleague!',
        color: 'Orange'
    },
    {
        sender: 'Heather Barranco',
        postcardImage: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&h=400&fit=crop',
        wishes: 'Sending you warm wishes for a joyful holiday season and a prosperous new year. Thank you for being such an amazing colleague!',
        color: 'Purple'
    },
  
   
    // 👇 ADD YOUR PRESENT BELOW - Just uncomment("cmd + /" in mac, "ctrl + /" in windows) and fill in your details! 👇
    // {
    //     sender: 'Firstname-Lastname',        // Your name in firstname-lastname format (e.g., 'John-Doe', 'Jane-Smith')
    //                                         // ID will be auto-generated as 'present-firstname-lastname'
    //     postcardImage: 'IMAGE_URL_HERE',    // Holiday image URL (find at unsplash.com/s/photos/christmas)
    //     wishes: 'Your personalized holiday wishes message goes here...', // Your message
    //     color: 'red'                        // Color: red, blue, green, purple, pink, orange, yellow, teal, indigo
    // },
];

// Add your present to this array - IDs are auto-generated from sender names
export const presents: PresentData[] = rawPresents.map(present => ({
    ...present,
    id: generateIdFromSender(present.sender)
}));
