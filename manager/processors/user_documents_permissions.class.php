<?php

class udperms{

	var $user;
	var $document;
	var $role;
	var $duplicateDoc = false;
	
	function checkPermissions() {
		
		global $udperms_allowroot;
		global $modx;

		$tblsc = $modx->getFullTableName('site_content');
		$tbldg = $modx->getFullTableName('document_groups');
		$tbldgn = $modx->getFullTableName('documentgroup_names');

		$user = $this->user;
		$document = $this->document;
		$role = $this->role;

		if($role==1) {
			return true;  // administrator - grant all document permissions
		}
		
		if($document==0 && $udperms_allowroot==1) {
			return true;
		}
		
		$permissionsok = false;  // set permissions to false
		
		if($modx->config['use_udperms']==0 || $modx->config['use_udperms']=="" || !isset($modx->config['use_udperms'])) {
			return true; // permissions aren't in use
		}
		
		$parent = $modx->db->getValue($modx->db->select('parent', $tblsc, "id='{$this->document}'"));
		if ($this->duplicateDoc==true && $parent==0 && $udperms_allowroot==0) {
			return false; // deny duplicate document at root if Allow Root is No
		}
		
		// get document groups for current user
		if($_SESSION['mgrDocgroups']) {
			$docgrp = implode(" || dg.document_group = ",$_SESSION['mgrDocgroups']);
		}

		/* Note:
			A document is flagged as private whenever the document group that it
			belongs to is assigned or links to a user group. In other words if 
			the document is assigned to a document group that is not yet linked 
			to a user group then that document will be made public. Documents that 
			are private to the manager users will not be private to web users if the 
			document group is not assigned to a web user group and visa versa.
		 */
		$rs = $modx->db->select(
			'count(sc.id)',
			"{$tblsc} AS sc 
				LEFT JOIN {$tbldg} AS dg on dg.document = sc.id 
				LEFT JOIN {$tbldgn} dgn ON dgn.id = dg.document_group",
			"sc.id='{$this->document}' AND (". ( (!$docgrp) ? null : "dg.document_group = ".$docgrp." ||" ) . " sc.privatemgr = 0)"
			);
		$limit = $modx->db->getValue($rs);
		if($limit==1) $permissionsok = true;
		
		return $permissionsok;
	}
}

?>