import { Auth } from "../components/auth"
import { Quote } from "../components/quotes"

export const Signin=()=>{
    return(
        <div className="lg:grid grid-cols-2">
            <div>
              <Auth type="signin"/>
            </div>
            <div className="invisible lg:visible">
            <Quote/>
            </div>
        </div>
    )
}