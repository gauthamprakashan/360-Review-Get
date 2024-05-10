// run npm start
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file



const supabase = createClient(
    process.env.SUPABASE_URL as string,

    process.env.SUPABASE_ANON_KEY!

  )


  
const fetchData = async() => {
    try{
        const { data: mentor, error } = await supabase
        .from('Mentor')
        .select('Mentee,Mentors')
        const mentorToMenteeMap = {};
        mentor!.forEach(mentor => {
            const mentorId = mentor.Mentors;
            const menteeId = mentor.Mentee;

            if (!mentorToMenteeMap[mentorId]) {
                mentorToMenteeMap[mentorId] = [];
            }
            mentorToMenteeMap[mentorId].push(menteeId);
        });
        console.log(mentorToMenteeMap)
        return mentorToMenteeMap


    }
 catch (error) {
    console.log('Error fetching data:', error.message);
}
}
fetchData()