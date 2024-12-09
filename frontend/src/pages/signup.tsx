import { Auth } from "../components/auth"
import { Quote } from "../components/quotes"
export const Signup=()=>{
    return (
        <div className="lg:grid grid-cols-2">
            <div>
              <Auth type="signup"/>
            </div>
            <div className="invisible lg:visible">
            <Quote/>
            </div>
        </div>
    )
}