import {Suspense, use} from "react";
import {AuthContext} from "../../Contexts/AuthContext";
import ApplicationStats from "./ApplicationState";
import {myApplicationsPromise} from "../../api/applicationsApi";
import ApplictionList from "./ApplicationList";

export default function MyApplictions() {
  const {user} = use(AuthContext);
  console.log(user.accessToken)
  return (
    <div>
      {/* <ApplicationStats /> */}
      <Suspense fallback={"loading your applications"}>
        <ApplictionList
          myApplicationsPromise={myApplicationsPromise(user.email,user.accessToken)}
        ></ApplictionList>
      </Suspense>
    </div>
  );
}
