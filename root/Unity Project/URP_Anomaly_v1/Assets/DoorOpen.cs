using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DoorOpen : MonoBehaviour
{
    private void OnTriggerEnter(Collider other)
    {
        if (other.tag == "Player")
        {
            GetComponent<Animator>().SetBool("Close", false);
            GetComponent<Animator>().SetBool("Open", true);
        }
    }

    private void OnTriggerExit(Collider other)
    {
        if (other.tag == "Player")
        {
            GetComponent<Animator>().SetBool("Open", false);
            GetComponent<Animator>().SetBool("Close", true);
        }
    }
}
