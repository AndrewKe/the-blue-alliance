import EventInfoTab from "./tabs/infoTab/EventInfoTab";
import TeamListTab from "./tabs/teamsTab/TeamListTab";
import { AlliancesTab } from "./tabs/AlliancesTab";
import { FMSMatchImportTab } from "./tabs/FMSMatchImportTab";
import { FMSScheduleImportTab } from "./tabs/FMSScheduleImportTab";
import { FMSRankingsImportTab } from "./tabs/FMSRankingsImportTab";

const EventWizardTabFrame = () => (
  <div>
    <div className="row">
      <div className="col-sm-12">
        <ul className="nav nav-tabs">
          <li>
            <a href="#info" data-toggle="tab">
              Event Info
            </a>
          </li>
          <li>
            <a href="#teams" data-toggle="tab">
              Teams
            </a>
          </li>
          <li>
            <a href="#results" data-toggle="tab">
              FMS Match Import
            </a>
          </li>
          <li>
            <a href="#schedule" data-toggle="tab">
              FMS Schedule Import
            </a>
          </li>
          {/*<li>*/}
          {/*  <a href="#matches" data-toggle="tab">*/}
          {/*    Match Play*/}
          {/*  </a>*/}
          {/*</li>*/}
          <li>
            <a href="#rankings" data-toggle="tab">
              FMS Rankings Import
            </a>
          </li>
          <li>
            <a href="#alliances" data-toggle="tab">
              Alliance Selection
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="tab-content row">
      <EventInfoTab />
      <TeamListTab />
      <FMSScheduleImportTab />
      {/*<div className="tab-pane" id="matches">*/}
      {/*  <h3>Match Play</h3>*/}
      {/*</div>*/}
      <FMSMatchImportTab />
      <FMSRankingsImportTab />
      <AlliancesTab />
    </div>
  </div>
);

export default EventWizardTabFrame;
